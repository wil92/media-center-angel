const express = require('express');

const router = express.Router();

router.get('/server', (req, res) => {
    const servername = process.env['SERVER_NAME'] || 'AngelMC-server';
    res.json({servername});
});

module.exports.router = router;
module.exports.path = '/api';
