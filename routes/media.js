const fs = require('fs');
const path = require('path');
const express = require('express');

const mime = require('mime-types');

const router = express.Router();

router.get('/media/:video_id', (req, res) => {
    const mediaTest = process.env['MEDIA_TEST_PATH'];
    const mediaType = mime.lookup(mediaTest);
    const stat = fs.statSync(mediaTest);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(mediaTest, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': mediaType,
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': mediaType,
        };
        res.writeHead(200, head);
        fs.createReadStream(mediaTest).pipe(res);
    }
});

module.exports.router = router;
module.exports.path = '/api';
