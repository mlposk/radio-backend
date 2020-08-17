const express = require('express');
const crypto  = require('crypto');
const fs      = require('fs');
const multer  = require('multer');
const mongo   = require('mongodb').MongoClient;
const config  = require('../config/config');

const router  = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let hash = crypto.randomBytes(1).toString('hex');
        let path = './uploads/' + hash;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: (req, file, cb) => {
        let hash = crypto.randomBytes(8).toString('hex');
        let ext = file.originalname.split('.').slice(-1);
        cb(null, hash + '.' + ext);
    }
});

const upload = multer({
    storage: storage,
});

router.get('/', (req, res) => {
    res.render('upload', { title: 'File upload' });
});

router.post('/', upload.any("fileData", 10), (req, res) => {
    const files = req.files;
    if (files) {
        mongo.connect(config.mongoUri, {useUnifiedTopology: true}, (err, client) => {
            const db = client.db('mlposk');
            for (let index in files) {
                let document = {}
                if (files.hasOwnProperty(index))  {
                    let file = files[index];
                    document = {
                        originalName: file.originalname,
                        mimeType: file.mimetype,
                        path: file.path,
                        size: file.size
                    }
                }
                db.collection('files').insertOne(document).then(success => res.send(success)).catch(err => {throw err});
            }
        })
    }
})

module.exports = router;
