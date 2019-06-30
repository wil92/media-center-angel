const express = require('express');

const router = express.Router();

router.get('/media/:video_id', (req, res) => {
    res.json({media_name: req.params['video_id']});
});

module.exports.router = router;
module.exports.path = '/api';
