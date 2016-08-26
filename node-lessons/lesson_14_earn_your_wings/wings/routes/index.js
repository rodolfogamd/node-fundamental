var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Customers', path: req.path });
});

router.get('/insert', function(req, res, next) {
  res.render('insert', { title: 'Insert Customers', path: req.path });
});

module.exports = router;
