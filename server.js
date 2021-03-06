const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const config = require('config');

const UsersRouter = require('./routes/api/users');
const JweetsRouter = require('./routes/api/jweets');

const app = express();
const mongoURI = process.env.MONGO_URI || config.get('mongoURI');
mongoose.set('useFindAndModify', false);
const db = mongoose
  .connect(mongoURI, { useNewUrlParser: true })
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

app.use('/api/users', UsersRouter);
app.use('/api/jweets', JweetsRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 4000;
const server = app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

module.exports = server;
