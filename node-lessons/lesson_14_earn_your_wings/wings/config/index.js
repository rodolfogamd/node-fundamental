var mongoose = require('mongoose');
var env = process.env.node_env;
var options = {};

if (env == 'production') {
    options = require('./production')
} else if (env == 'test') {
    options = require('./test')
} else {
    options = require('./development')
}

var db = mongoose.connect(options.path, options);

module.exports = db;