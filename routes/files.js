const express = require('express');
const path = require('path');
const router = express.Router();
const crypto  = require('crypto');
const fs      = require('fs');
const multer  = require('multer');
const mongoose = require('mongoose');
const Schema = require("mongoose/lib/schema");

const config = require('../config/config');
const helper = require('../functions/helper');
const schema = require('../models/files');

mongoose.connect(config.mongo.uri, config.mongo.options);
const File = new mongoose.model('files', new Schema(schema, {versionKey: false}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let hash = crypto.randomBytes(1).toString('hex');
        let path = './'+ config.upload.dir +'/' + hash;
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

function normalize(dirPath) {
    const normalizedPath = path.normalize(dirPath);
    return normalizedPath.includes(config.upload.root) ? normalizedPath : config.upload.root;
}

//read
router.post('/', (req, res) => {
    File.find().then(document => res.send(document));
});

//write
router.post('/upload', upload.any("fileData", 10), (req, res) => {
    const fileCountString = req.files.length === 1 ? '1 file' : req.files.length + ' files';
    File.create(helper.file.makeArray(req.files), (err, docs) => {
        if (err) {
            throw err;
        }
        res.send(fileCountString + ' successfully added.')
    });
});

//update
router.post('/update/:id/', (req, res) => {
    File.findByIdAndUpdate(req.params.id, req.body).then(result => {
        if (result) {
            res.send(req.body.originalName + ' successfully updated.')
        } else {
            res.send('File not found.')
        }
    });
});

//delete
router.post('/delete/:id/', (req, res) => {
    File.findByIdAndDelete(req.params.id).then(result => {
        if (result) {
            fs.unlink('./' + result.path, err => {
                if (err) {
                    throw err;
                }
                res.send('File successfully deleted.');
            });
        } else {
            res.send('File not found.')
        }
    });
});

module.exports = router;
