var express = require('express'),
    mongoose = require('mongoose'),
    mrq = require('mongoose-rest-query'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    schemas = require('./schema'),
    app = express(),
    restify = mrq.restify;

mrq.config.modelSchemas = schemas;
mrq.config.dbPath = /* 'mongodb://192.168.1.139:27017/testproj'; */'mongodb://adminTashley:codenametashley@ds016138.mlab.com:16138/codenametashley'

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(mrq.db);

app.use('/api/', function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token, x-client-id");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

    if (req.method === 'OPTIONS') {
        res.end();
    } else
        next();
});

app.use('/api/users', restify('User'));

app.use('/api', function(req, res) {
    res.send('Welcome to the service');
});

app.listen();
