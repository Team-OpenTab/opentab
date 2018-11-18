// Dependencies.

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');
require('dotenv').config();

// Server and socket.io.
const app = express();
const server = http.Server(app);
const io = socketIo(server);

// Heroku and localhost database.
const db = pgp({
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

// bcrypt salt rounds.
const saltRounds = 10;

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
});

// Create user endpoint.
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

// User login endpoint.
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.oneOrNone('SELECT * FROM "user" WHERE email = $1', [email])
    .then(user => {
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
    })
    .catch(error => {
      console.log(error);
      res.json({ error });
    });
});

// Create a new round instance.
app.post('/api/new-round', (req, res) => {
  const { buyerId, recipients, roundName } = req.body;
  db.one(
    `
    INSERT INTO round (user_id, name, time)
    VALUES ($1, $2, now())
    RETURNING id
    `,
    [buyerId, roundName],
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
              [buyerId, recipientId, roundId, -recipients[recipientId].amount],
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
                recipients[recipientId].amount,
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
      res.json({
        status: 200,
        data: { roundId },
      });
    })
    .then(() => io.emit('refresh'))
    .catch(error => {
      console.log(error);
      res.json({ error });
    });
});

// Get relevent balances of a users contacts.
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
  )
    .then(data => {
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
    })
    .catch(error => {
      console.log(error);
      res.json({ error });
    });
});

// Approve a new contact.
app.post('/api/approve-contact', (req, res) => {
  const { userId, contactId } = req.body;
  db.one(
    `
    UPDATE contact_user
    SET approved = true
    WHERE user_id = $1
    AND contact_id = $2
    RETURNING approved;
    `,
    [userId, contactId],
  )
    .then(data => {
      res.json({
        status: 200,
        data,
      });
    })
    .catch(error => {
      console.log(error);
      res.json({ error });
    });
});

// Import a users contacts.
app.get('/api/get-contacts/:userId', (req, res) => {
  const { userId } = req.params;
  db.any(
    `
    SELECT contact_id, username, email, phone, avatar, contact_user.approved
    FROM contact_user, "user"
    WHERE contact_id = "user".id
    AND user_id = $1;
    `,
    [userId],
  )
    .then(data => {
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
    })
    .catch(error => {
      console.log(error);
      res.json({ error });
    });
});

// Search for a user to add as a contact.
app.get('/api/get-contact/:username', (req, res) => {
  const username = `${req.params.username.toLowerCase()}%`;
  db.any(
    `
    SELECT id, username, avatar, email
    FROM "user"
    WHERE lower(username) LIKE $1;
    `,
    [username],
  )
    .then(user => {
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
    })
    .catch(error => {
      console.log(error);
      res.json({ error });
    });
});

// Add a new contact.
app.post('/api/add-contact', (req, res) => {
  const { userId, contactId } = req.body;
  Promise.all([
    db.none(
      `
      INSERT INTO contact_user (user_id, contact_id, approved)
      VALUES ($1, $2, true)
      `,
      [userId, contactId],
    ),
    db.none(
      `
      INSERT INTO contact_user (user_id, contact_id, approved)
      VALUES ($1, $2, false)
      `,
      [contactId, userId],
    ),
  ])
    .then(() => {
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

// Make a payment to a contact - currently sets balance between two contacts to £0.00.
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
      res.json({ status: 200 });
    })
    .then(() => io.emit('refresh'))
    .catch(error =>
      res.status(400).json({
        status: 400,
        message: 'Error while making payment',
        details: error,
      }),
    );
});

// Fetches all rounds that the user has bought and rounds in which they have been a counterpart.
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
        db.any(
          `
          SELECT transaction.id, transaction.user_id, transaction.counterpart_id,
          transaction.round_id, transaction.amount, transaction.type, round.name,
          transaction.time, "user".username
          FROM transaction, round, "user"
          WHERE round_id = ${round.round_id}
          AND amount < 0
          AND transaction.round_id = round.id
          AND "user".id = transaction.counterpart_id
          `,
        ),
      );
      return Promise.all(promisesArray);
    })
    .then(response => {
      const roundStore = response
        .map(round => {
          const reducedRound = round.reduce((acc, curr) => {
            const counterparts = !acc.counterparts
              ? { [curr.counterpart_id]: { username: curr.username, amount: curr.amount } }
              : acc.counterparts;
            acc = {
              roundId: curr.round_id,
              roundName: curr.name,
              userId: curr.user_id,
              counterparts: Object.assign({}, counterparts, {
                [curr.counterpart_id]: {
                  username: curr.username,
                  id: curr.counterpart_id,
                  amount: curr.amount,
                },
              }),
              roundTime: curr.time,
            };
            return acc;
          }, {});
          const roundTotal = Object.values(reducedRound.counterparts).reduce(
            (acc, item) => parseFloat(acc) + parseFloat(item.amount),
            0,
          );

          const roundWithTotal = Object.assign({}, reducedRound, {
            roundTotal: roundTotal.toFixed(2),
          });
          return roundWithTotal;
        })
        .sort((a, b) => new Date(b.roundTime) - new Date(a.roundTime));
      res.json(roundStore);
    })
    .catch(error => {
      console.log(error);
      res.json({ error });
    });
});

server.listen(process.env.PORT || 8080, () => {
  console.log('Listening on port 8080');
});
