const express = require('express'),
    mrq = require('mongoose-rest-query'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    app = express(),
    helmet = require('helmet'),
    package = require('./package.json'),
    restify = mrq.restify,
    config = require('./config');

mrq.config.modelSchemas = config.SCHEMAS;
mrq.config.dbPath = config.DB_PATH;

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

app.use('/', (req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token, x-client-id");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

    res.method === 'OPTIONS' ? res.end() : next()
});

app.use('/users', restify('User'));

app.use('/version', (req, res) => {
    res.send(package.version);
});

app.use('/', (req, res) => {
    res.send('Welcome to the service');
});

app.listen(config.PORT, () => {
    console.log('Service is listening on port', config.PORT);
});