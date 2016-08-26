var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// create a schema
var customerSchema = new Schema({
    name: String,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    premium: { type: Boolean, default: false },
    location: String,
    meta: {
        age: Number,
        website: String
    },
}, {timestamps: true});

//hashing the password before saving the customer
customerSchema.pre('save', function(next) {
    var customer = this;

    // only hash the password if it has been modified (or is new)
    if (!customer.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(customer.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            customer.password = hash;
            next();
        });
    });
});


// the schema is useless so far
// we need to create a model using it
var Customer = mongoose.model('Customer', customerSchema);
// make this available to our customer in our Node applications
module.exports = Customer;