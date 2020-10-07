var express = require('express');
var router = express.Router();

/* GET Kullanım. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Kullanım' });
});

module.exports = router;
