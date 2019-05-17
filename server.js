const express = require('express');
const mongoose = require('mongoose');

const UsersRouter = require('./routes/api/users');
const keys = require('./config/keys');

const app = express();
const db = mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
app.get('/', (req, res) => {
  res.send('Hello Test!');
});

app.use('/api/users', UsersRouter);

const port = process.env.port || 3000;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
