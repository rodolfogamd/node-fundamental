var Model = require('../models/customer');

var Customers = (function (Customer) {
    var get = function (req, res, next) {
        Customer.find(function (err, customers) {
            if (err)
                res.status(500).json(err);
            else
                res.status(200).json(customers);
        });
    }

    var put = function (req, res, next) {
        var customer = new Customer(req.body);
        customer.save(function (err) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(201).json(customer.username + ' inserted successfully');
            }
        });
    }

    return {
        get: get,
        put: put
    };
})(Model);

module.exports = Customers;