var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    firstname: String,
    lastname: String,
    address: String,
    phone: String,
    email: String,
    age: Number
});

module.exports = userSchema;
