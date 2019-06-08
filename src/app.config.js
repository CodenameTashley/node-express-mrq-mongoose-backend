module.exports = {
    PORT: process.env.PORT || 9060,
    DB_PATH: 'mongodb://adminTashley:codenametashley@ds016138.mlab.com:16138/codenametashley',
    SCHEMAS: require('../schema'),
    jwt: {
        iss: 'darthcoders',
        secretKey: 'dfe6cb38402873719b964ace46c3ac83b8c21c938c7bf46e8efee485a3e5c3bd4e7d2ed109c6c6b4c627510662876da1eda94f856f1abb8748bdbb5d4e44bbc1',
        algorithm: 'HS256',
        durationType: 'days',
        durationShort: 1,
        durationLong: 365
    }
}