var express = require('express');
var router = express.Router();

const path = require('path');
const fs = require('fs');
const root = '/Users/ksoplm/Documents/ksoplm/testdir';

function normalize(dirPath) {
    let normalizedPath = path.normalize(dirPath);
    return normalizedPath.includes(root) ? normalizedPath : root;
}

router.post('/', (req, res) => {
    const dirPath = req.body.path;
    const normalizedPath = !dirPath ? root : normalize(root + '/' + dirPath);
    fs.readdir(normalizedPath, (err, items) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error('No such directory: ' + dirPath);
                return;
            }
        }
        res.json(items);
    })
})

module.exports = router;
