const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const UsersRouter = require('./routes/api/users');
const JweetsRouter = require('./routes/api/jweets');
const keys = require('./config/keys');

const app = express();
const db = mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {})
  .catch(err => {});

app.use(
  express.json({
    extended: false
  })
);
app.use(cookieParser());
app.use(passport.initialize());
require('./config/passport')(passport);
app.get('/', (req, res) => {
  res.send('Hello Test!');
});

app.use('/api/users', UsersRouter);
app.use('/api/jweets', JweetsRouter);

const port = process.env.port || 4000;
const server = app.listen(port, function() {
  // console.log(`Listening on port ${port}`);
});

module.exports = server;
