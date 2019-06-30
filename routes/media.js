const express = require('express');

const router = express.Router();

router.get('/media/:video_id', (req, res) => {
    const mediaTest = process.env['MEDIA_TEST_PATH'];
    res.json({media_name: req.params['video_id']});
});

module.exports.router = router;
module.exports.path = '/api';
