var mrq = require('mongoose-rest-query');
var async = require('async');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../utils/jwt');
var config = require('../app.config');

module.exports = function () {

    return {
        login: login
    };

    function login(req, res) {

        var User = mrq.model(req, 'User');
        var email = req.body.email;

        function findUser(callback) {

            User
                .findOne({
                    email: email
                })
                .select('email password isActive')
                .exec(function (err, user) {
                    callback(err, {
                        user: {}
                    });
                });

        }

        function checkUserPassword(result, callback) {

            bcrypt.compare(req.body.password, result.user.password, function (err, value) {
                if (value)
                    callback(err, result);
                else
                    callback(new Error('Invalid Email or Password'));
            });

        }

        function updateLastLogin(result, callback) {

            User.update({
                _id: result.user.id
            }, {
                'lastlogin': new Date()
            }, function (err, data) {
                callback(err, result);
            });
        }

        function generateJWT(result, callback) {

            var data = {
                id: result.user.id,
                email: result.user.email
            };

            jwt.generate(data, config.jwt.durationLong, function (err, data) {
                callback(null, {
                    token: data
                });
            });
        }

        async.waterfall([findUser, checkUserPassword, updateLastLogin, generateJWT], function (err, result) {

            if (err)
                res.status(401).send(err.toString());
            else
                res.send(result);

        });
    }
};