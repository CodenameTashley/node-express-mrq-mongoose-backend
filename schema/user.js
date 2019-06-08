var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    lastlogin: {
        type: Date,
        default: new Date()
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = userSchema;