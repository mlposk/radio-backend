const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('Le Silence est d\'or');
});

module.exports = router;
