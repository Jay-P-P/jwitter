const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const UsersRouter = require('./routes/api/users');
const keys = require('./config/keys');

const app = express();
const db = mongoose
  .connect(keys.testMongoURI, { useNewUrlParser: true })
  .then(() => {})
  .catch(err => {});

app.use(
  express.json({
    extended: false
  })
);
app.use(passport.initialize());
require('./config/passport')(passport);
app.get('/', (req, res) => {
  res.send('Hello Test!');
});

app.use('/api/users', UsersRouter);

const port = process.env.port || 3000;
const server = app.listen(port, function() {
  // console.log(`Listening on port ${port}`);
});

module.exports = server;
