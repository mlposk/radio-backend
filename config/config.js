const config = {};

const mongo = {
    schema: 'mongodb+srv',
    user: 'db_user',
    password: '6birlGtmqPtVIgrP',
    host: 'cluster0.7znfd.gcp.mongodb.net',
    databaseName: 'mlposk'
}

config.mongo = {
    uri:
        mongo.schema + '://' +
        mongo.user + ':' +
        mongo.password + '@' +
        mongo.host + '/' +
        mongo.databaseName,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
};

config.upload = {}

config.upload ={
    dir: 'uploads',
    root: '/Users/ksoplm/Code/ksoplm/radio-backend/'
}

module.exports = config;