var express = require('express'),
    mongoose = require('mongoose'),
    mrq = require('mongoose-rest-query'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    schemas = require('./schema'),
    app = express(),
    helmet = require('helmet'),
    package = require('./package.json'),
    restify = mrq.restify;

const PORT = process.env.PORT || 3000;

mrq.config.modelSchemas = schemas;
mrq.config.dbPath = 'mongodb://adminTashley:codenametashley@ds016138.mlab.com:16138/codenametashley'

app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json({
    limit: '5mb'
}));

app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true
}));

app.use(mrq.db);

app.use('/', function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token, x-client-id");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

    if (req.method === 'OPTIONS') {
        res.end();
    } else
        next();
});

 app.use('/users', restify('User'));

app.use('/version', function (req, res) {
    res.send(package.version);
});

app.use('/', function (req, res) {
    res.send('Welcome to the service');
});

app.listen(PORT, function () {
    console.log('Service is listening on port', PORT);
});