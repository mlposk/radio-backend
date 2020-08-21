const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = require("mongoose/lib/schema");

const config = require('../config/config');
const schema = require('../models/playlists');

mongoose.connect(config.mongo.uri, config.mongo.options);
const Playlists = new mongoose.model('playlists', new Schema(schema, {versionKey: false}));

//create
router.post('/create', (req, res) => {
    Playlists.create(req.body).then(result => res.send(req.body.name + ' successfully created.'));
});

//read
router.post('/', (req, res) => {
    Playlists.find().then(document => res.send(document));
});

//update
router.post('/update/:id/', (req, res) => {
    Playlists.findByIdAndUpdate(req.params.id, req.body).then(result => {
        if (result) {
            res.send(req.body.name + ' successfully updated.')
        } else {
            res.send('Playlist not found.')
        }
    });

});

//delete
router.post('/delete/:id/', (req, res) => {
    Playlists.findByIdAndDelete(req.params.id).then(result => {
        if (result) {
            res.send('Playlist successfully deleted.')
        } else {
            res.send('Playlist not found.')
        }
    });
});

module.exports = router;
