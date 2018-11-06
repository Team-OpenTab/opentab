const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
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

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
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
        counterpartIds.map(counterpartId =>
          db.one(
            `INSERT INTO round_user (round_id, counterpart_id) 
              VALUES ($1, $2) 
              RETURNING id`,
            [data.id, counterpartId],
          ),
        ),
      ),
    )
    .then(() =>
      counterpartIds.map(counterpartId =>
        db.one(
          `INSERT INTO ledger_$1 (user_id, counterpart_id, amount, type, time)
            VALUES ($1, $2, $3, 'round', now())
            RETURNING id`,
          [userId, counterpartId, -amount],
        ),
      ),
    )
    .then(() =>
      Promise.all(
        counterpartIds.map(counterpartId => {
          const type = userId === counterpartId ? 'self' : 'round';
          return db.one(
            `INSERT INTO ledger_$1 (user_id, counterpart_id, amount, type, time)
              VALUES ($1, $2, $3, $4, now())
              RETURNING id`,
            [counterpartId, userId, amount, type],
          );
        }),
      ),
    )
    .then(data => {
      io.emit('refresh');
      res.json(data);
    });
});

app.get('/api/get-balances/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  db.any(
    `SELECT counterpart_id, SUM(amount) 
      FROM ledger_$1 
      GROUP BY counterpart_id`,
    [userId],
  )
    .then(data => {
      const balances = {};
      data.map(ledgerLine =>
        Object.assign(balances, { [ledgerLine.counterpart_id]: ledgerLine.sum }),
      );
      res.json(balances);
    })
    .catch(error => console.log(error));
});

app.post('/api/make-payment', (req, res) => {
  const payerId = parseInt(req.body.payerId);
  const receiverId = parseInt(req.body.receiverId);
  const amount = parseInt(req.body.amount).toFixed(2);
  const negativeAmount = amount - amount * 2;
  db.none(
    `INSERT INTO ledger_$1 (user_id, counterpart_id, amount, type, time) 
      VALUES ($1, $2, $3, 'payment', now())`,
    [payerId, receiverId, negativeAmount],
  )
    .then(() =>
      db.none(
        `INSERT INTO ledger_$1 (user_id, counterpart_id, amount, type, time) 
          VALUES ($1, $2, $3, 'payment', now())`,
        [receiverId, payerId, amount],
      ),
    )
    .then(() => {
      io.emit('refresh');
      res.json({ Status: 'OK' });
    })
    .catch(error => console.log(error));
});

server.listen(8080, () => {
  console.log('Listening on port 8080');
});
