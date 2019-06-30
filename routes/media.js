const express = require('express');

const router = express.Router();

router.get('/media', (req, res) => {
    res.json({});
});

module.exports.router = router;
module.exports.path = '/api';
