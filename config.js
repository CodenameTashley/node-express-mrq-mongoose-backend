module.exports = {
    PORT: process.env.PORT || 4500,
    DB_PATH: 'mongodb://adminTashley:codenametashley@ds016138.mlab.com:16138/codenametashley',
    SCHEMAS: require('./schema')
}