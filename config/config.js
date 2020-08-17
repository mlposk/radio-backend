const config = {};

mongo = {
    schema: 'mongodb+srv',
    user: 'db_user',
    password: '6birlGtmqPtVIgrP',
    host: 'cluster0.7znfd.gcp.mongodb.net',
    databaseName: 'mlposk',
    options: '?retryWrites=true&w=majority'
}

config.mongoUri =
    mongo.schema + '://' +
    mongo.user + ':' +
    mongo.password + '@' +
    mongo.host + '/' +
    mongo.databaseName +
    mongo.options

config.uploadPath = '/Users/ksoplm/Code/ksoplm/radio-backend/uploads/';

module.exports = config;