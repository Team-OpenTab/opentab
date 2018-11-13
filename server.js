const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const server = http.Server(app);
const io = socketIo(server);

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

const saltRounds = 10;
app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/api/new-user', (req, res) => {
  const { username, password, email, phone, avatar } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.one(
      `
      INSERT INTO "user" (username, password, email, phone, avatar)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
      `,
      [username, hash, email, phone, avatar],
    )
      .then(userId => {
        res.json({
          status: 200,
          data: userId,
        });
      })
      .catch(error => {
        res.status(401).json({
          status: 401,
          message: 'E-mail address already registered to another user',
          details: error,
        });
      });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.oneOrNone('SELECT * FROM "user" WHERE email = $1', [email]).then(user => {
    if (!user) {
      res.status(404).json({
        status: 404,
        message: 'Incorrect e-mail',
      });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.json({
            status: 200,
            data: user,
          });
        } else {
          res.status(401).json({
            status: 401,
            message: 'Incorrect password',
            details: err,
          });
        }
      });
    }
  });
});

app.post('/api/new-round', (req, res) => {
  const { buyerId, recipients } = req.body;
  db.one(
    `
    INSERT INTO round (user_id, time)
    VALUES ($1, now())
    RETURNING id
    `,
    [buyerId],
  )
    .then(data => {
      const roundId = data.id;
      return Promise.all(
        Object.keys(recipients)
          .map(recipientId => [
            db.one(
              `
              INSERT INTO transaction (user_id, counterpart_id, round_id, amount, type, time)
              VALUES ($1, $2, $3, $4, 'round', now())
              RETURNING round_id
              `,
              [buyerId, recipientId, roundId, -recipients[recipientId]],
            ),
            db.one(
              `
              INSERT INTO transaction (user_id, counterpart_id, round_id, amount, type, time)
              VALUES ($1, $2, $3, $4, $5, now())
              RETURNING round_id
              `,
              [
                recipientId,
                buyerId,
                roundId,
                recipients[recipientId],
                buyerId === parseInt(recipientId) ? 'self' : 'round',
              ],
            ),
            db.one(
              `
              INSERT INTO round_user (round_id, counterpart_id)
              VALUES ($1, $2)
              RETURNING round_id
              `,
              [roundId, recipientId],
            ),
          ])
          .reduce((a, b) => a.concat(b)),
      );
    })
    .then(data => {
      const roundId = data[0].round_id;
      io.emit('refresh');
      res.json({
        status: 200,
        data: { roundId },
      });
    });
});

app.get('/api/get-balances/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  db.any(
    `
    (
      SELECT "user".username, counterpart_id, SUM(amount)
      FROM transaction, "user"
      WHERE user_id = $1
      AND transaction.counterpart_id = "user".id
      GROUP BY counterpart_id, "user".username)
    UNION ALL
    (
      SELECT "user".username, contact_id, 0.00 as sum
      FROM contact_user, "user"
      WHERE contact_user.user_id = $1
      AND contact_user.contact_id = "user".id
      AND contact_user.contact_id NOT IN (
        SELECT DISTINCT counterpart_id FROM transaction
        WHERE transaction.user_id = contact_user.user_id
      )
    )
    `,
    [userId],
  ).then(data => {
    if (!data.length) {
      res.status(404).json({
        status: 404,
        message: 'No data available',
      });
    } else {
      const balances = {};
      data.map(balance => Object.assign(balances, { [balance.counterpart_id]: balance }));
      res.json({
        status: 200,
        data: { balances },
      });
    }
  });
});

app.get('/api/get-contacts/:userId', (req, res) => {
  const { userId } = req.params;
  db.any(
    `
    SELECT contact_id, username, email, phone, avatar
    FROM contact_user, "user"
    WHERE contact_id = "user".id
    AND user_id = $1;
    `,
    [userId],
  ).then(data => {
    if (!data.length) {
      res.status(404).json({
        status: 404,
        message: 'No data available',
      });
    } else {
      res.json({
        status: 200,
        data,
      });
    }
  });
});

app.get('/api/get-contact/:username', (req, res) => {
  const username = `${req.params.username.toLowerCase()}%`;
  db.any(
    `
    SELECT id, username
    FROM "user"
    WHERE lower(username) LIKE $1;
    `,
    [username],
  ).then(user => {
    if (!user.length) {
      res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    } else {
      res.json({
        status: 200,
        data: { user },
      });
    }
  });
});

app.post('/api/add-contact', (req, res) => {
  const { userId, contactId } = req.body;
  Promise.all([
    db.none(
      `
      INSERT INTO contact_user (user_id, contact_id)
      VALUES ($1, $2)
      `,
      [userId, contactId],
    ),
    db.none(
      `
      INSERT INTO contact_user (user_id, contact_id)
      VALUES ($1, $2)
      `,
      [contactId, userId],
    ),
  ])
    .then(() => {
      io.emit('refresh');
      res.json({ status: 200 });
    })
    .catch(error =>
      res.status(400).json({
        status: 400,
        message: 'Error while adding user to contacts',
        details: error,
      }),
    );
});

app.post('/api/make-payment', (req, res) => {
  const payerId = parseInt(req.body.payerId);
  const receiverId = parseInt(req.body.receiverId);
  const amount = Number(req.body.amount).toFixed(2);
  Promise.all([
    db.none(
      `INSERT INTO transaction (user_id, counterpart_id, amount, type, time)
        VALUES ($1, $2, $3, 'payment', now())`,
      [payerId, receiverId, -amount],
    ),
    db.none(
      `INSERT INTO transaction (user_id, counterpart_id, amount, type, time)
        VALUES ($1, $2, $3, 'payment', now())`,
      [receiverId, payerId, amount],
    ),
  ])
    .then(() => {
      io.emit('refresh');
      res.json({ status: 200 });
    })
    .catch(error =>
      res.status(400).json({
        status: 400,
        message: 'Error while making payment',
        details: error,
      }),
    );
});

app.get('/api/get-rounds/:userId', (req, res) => {
  const { userId } = req.params;
  db.any(
    `SELECT round_id FROM round_user WHERE counterpart_id = $1
     UNION
     SELECT id FROM "round" WHERE user_id = $1 `,
    [userId],
  )
    .then(response => {
      const promisesArray = response.map(round =>
        db.any(`SELECT * FROM transaction WHERE round_id = ${round.round_id} AND amount < 0`),
      );
      return Promise.all(promisesArray);
    })
    .then(response => {
      // console.log(response);

      const roundStore = response.map(round => {
        const reducedRound = round.reduce((acc, curr) => {
          const counterparts = !acc.counterparts
            ? { [curr.counterpart_id]: curr.amount }
            : acc.counterparts;
          acc = {
            roundId: curr.round_id,
            userId: curr.user_id,
            counterparts: Object.assign({}, counterparts, { [curr.counterpart_id]: curr.amount }),
            // roundTotal: Object.values(counterparts).reduce(
            //   (agg, val) => parseFloat(agg) + parseFloat(val),
            //   Object.values(counterparts)[0],
            roundTime: curr.time,
          };
          return acc;
        }, {});
        console.log(reducedRound.counterparts);
        const roundTotal = Object.values(reducedRound.counterparts).reduce(
          (acc, item) => parseFloat(acc) + parseFloat(item),
          0,
        );
        const roundWithTotal = Object.assign({}, reducedRound, {
          roundTotal: roundTotal.toFixed(2),
        });
        return roundWithTotal;
      });

      // .filter(round => round.hasOwnProperty('roundId'));
      console.log(roundStore);
      res.json(roundStore);
    });
});

server.listen(8080, () => {
  console.log('Listening on port 8080');
});

// Gets round buyer, counterparts, amount given to each counterpart
