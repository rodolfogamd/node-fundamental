var express = require('express');
var router = express.Router();
var Customers = require('../controllers/customers');

router.route('/')
        .get(Customers.get)
        .put(Customers.put);

module.exports = router;
