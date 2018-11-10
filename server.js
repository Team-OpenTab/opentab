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

// TODO: Error handling in responses

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/api/new-user', (req, res) => {
  const { username, password, email, phone } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.one(
      `INSERT INTO "user" (username, password, email, phone)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
      [username, hash, email, phone],
    )
      .then(data => {
        res.json({ status: 'OK', id: data.id });
      })
      .catch(error => console.log(error));
  });
});

// TODO: change username to email on login page
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.one('SELECT * FROM "user" WHERE email = $1', [email])
    .then(user => {
      if (!user) {
        console.log('User does not exist!');
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            res.json({ status: 'OK', id: user.id, username: user.username });
          } else {
            res.json('Incorrect Password');
            console.log('Incorrect Password');
          }
        });
      }
    })
    .catch(error => console.log(error));
});

// {
// "userId": 2,
// "counterpartIds": [2,3,4,5,6],
// "totalAmount": 25
// }
app.post('/api/new-round', (req, res) => {
  const { userId, counterpartIds, totalAmount } = req.body;
  const amount = totalAmount / counterpartIds.length;

  db.one(
    `INSERT INTO round (user_id, time)
      VALUES ($1, now())
      RETURNING id`,
    [userId],
  )
    .then(data =>
      Promise.all(
        counterpartIds
          .map(counterpartId => [
            db.one(
              `INSERT INTO transaction (user_id, counterpart_id, round_id, amount, type, time)
                  VALUES ($1, $2, $3, $4, 'round', now())
                  RETURNING id`,
              [userId, counterpartId, data.id, -amount],
            ),
            db.one(
              `INSERT INTO transaction (user_id, counterpart_id, round_id, amount, type, time)
                VALUES ($1, $2, $3, $4, $5, now())
                RETURNING id`,
              [counterpartId, userId, data.id, amount, userId === counterpartId ? 'self' : 'round'],
            ),
            db.none(
              `INSERT INTO round_user (round_id, counterpart_id)
                  VALUES ($1, $2)`,
              [data.id, counterpartId],
            ),
          ])
          .reduce((a, b) => a.concat(b)),
      ),
    )
    .then(() => {
      io.emit('refresh');
      res.json({ status: 'OK' });
    })
    .catch(error => console.log(error));
});

app.get('/api/get-balances/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);

  db.any(
    `(SELECT "user".username, counterpart_id, SUM(amount)
          FROM transaction, "user"
          WHERE user_id = $1
          AND transaction.counterpart_id = "user".id
          GROUP BY counterpart_id, "user".username)
    UNION ALL
    (SELECT "user".username, contact_id, 0.00 as sum
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
  )
    .then(data => {
      console.log(data);
      const balances = {};
      data.map(ledgerLine => Object.assign(balances, { [ledgerLine.counterpart_id]: ledgerLine }));
      console.log(balances);
      res.json({ status: 'OK', balances });
    })
    .catch(error => {
      console.log(error);
      res.json(error);
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
  )
    .then(data => {
      res.json({ status: 'OK', data });
    })
    .catch(error => res.json(error));
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
      res.json({ status: 'OK' });
    })
    .catch(error => res.json(error));
});

app.post('/api/make-payment', (req, res) => {
  const payerId = parseInt(req.body.payerId);
  const receiverId = parseInt(req.body.receiverId);
  const amount = parseInt(req.body.amount).toFixed(2);
  const negativeAmount = amount - amount * 2;
  db.none(
    `INSERT INTO transaction (user_id, counterpart_id, amount, type, time)
      VALUES ($1, $2, $3, 'payment', now())`,
    [payerId, receiverId, negativeAmount],
  )
    .then(() =>
      db.none(
        `INSERT INTO transaction (user_id, counterpart_id, amount, type, time)
          VALUES ($1, $2, $3, 'payment', now())`,
        [receiverId, payerId, amount],
      ),
    )
    .then(() => {
      io.emit('refresh');
      res.json({ status: 'OK' });
    })
    .catch(error => console.log(error));
});

app.get('/api/get-rounds/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  db.any(
    `SELECT transaction.round_id, round.user_id, 
    transaction.counterpart_id, transaction.time, transaction.amount
    FROM transaction, round 
    WHERE round.user_id = $1
    AND round.user_id = transaction.user_id
    AND type = 'round'
    AND transaction.amount < 0
    GROUP BY transaction.round_id, round.user_id, 
    transaction.counterpart_id, transaction.amount, transaction.time`,
    [userId],
  ).then(response => {
    const groupedRounds = response.reduce((acc, curr) => {
      if (!acc[curr.round_id]) {
        acc[curr.round_id] = [];
      }
      acc[curr.round_id].push(curr);
      return acc;
    }, {});
    const refinedRoundObjects = Object.keys(groupedRounds).map(key =>
      groupedRounds[key].reduce((acc, curr) => {
        const counterparts = !acc.counterparts ? { [curr.user_id]: curr.amount } : acc.counterparts;
        acc = {
          roundId: key,
          userId: curr.user_id,
          counterparts: Object.assign({}, counterparts, { [curr.counterpart_id]: curr.amount }),
          roundTotal: Object.values(counterparts).reduce(
            (agg, val) => parseInt(agg) + parseInt(val),
            Object.values(counterparts)[0],
          ),
          roundTime: curr.time,
        };
        return acc;
      }, {}),
    );
    res.json(refinedRoundObjects);
  });
});

server.listen(8080, () => {
  console.log('Listening on port 8080');
});

// Gets round buyer, counterparts, amount given to each counterpart
