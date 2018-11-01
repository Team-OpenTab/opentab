const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
