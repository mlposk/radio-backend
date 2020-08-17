const express = require('express');
const path = require('path');
const router  = express.Router();
const mongo = require('mongodb').MongoClient;
const config = require('../config/config');


function normalize(dirPath) {
    const normalizedPath = path.normalize(dirPath);
    return normalizedPath.includes(config.uploadPath) ? normalizedPath : config.uploadPath;
}

router.get('/', (req, res) => {
    mongo.connect(config.mongoUri, { useUnifiedTopology: true }).then((client) => {
        const db = client.db('mlposk');
        const cursor = db.collection('files').find();

        cursor.toArray((err, item) => {
            if (err) throw err;
            res.render('files', { title: 'File list', items: item});
        })
    });
})

module.exports = router;
