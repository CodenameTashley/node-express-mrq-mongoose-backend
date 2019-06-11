const express = require('express'),
    mrq = require('mongoose-rest-query'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    app = express(),
    helmet = require('helmet'),
    package = require('../package.json'),
    restify = mrq.restify,
    config = require('./app.config');

let middleware = require('./middleware');

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
app.use(middleware.cors);

//public route

// app.use('/', (req, res) => {
//     res.send('Welcome to the service');
// });

app.use('/version', (req, res) => {
    res.send(package.version);
});

app.use('/api', require('./route/authRoute')());

app.use(middleware.auth);

app.use('/users', restify('User'));

app.listen(config.PORT, () => {
    console.log('Service is listening on port', config.PORT);
});