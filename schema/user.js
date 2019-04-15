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
    passwordToken: {
        type: String,
        required: true,
        select: false
    },
    lastlogin: {
        type: Date,
        default: new Date()
    }
});

module.exports = userSchema;
