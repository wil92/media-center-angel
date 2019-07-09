const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    let mediasDirectories = process.env['MEDIAS_DIRECTORIES'].split(':');
    res.send(mediasDirectories);
});

module.exports.router = router;
module.exports.path = '/api';
