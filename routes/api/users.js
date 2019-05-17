var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from the users route.');
});

module.exports = router;
