const fs = require('fs');
const path = require('path');
const express = require('express');

const mime = require('mime-types');
const srt2vtt = require('srt-to-vtt');

const router = express.Router();

router.get('/subtitle/:dir_id', (req, res) => {
    let mediasDirectories = process.env['MEDIAS_DIRECTORIES'].split(':');
    const group = mediasDirectories[req.params['dir_id']];
    const subdir = req.query['subdir'] || '';

    const subtitlePath = path.join(group, subdir);
    fs.createReadStream(subtitlePath)
        .pipe(srt2vtt())
        .pipe(res);
});

router.get('/media/:dir_id/', (req, res) => {
    let mediasDirectories = process.env['MEDIAS_DIRECTORIES'].split(':');
    const group = mediasDirectories[req.params['dir_id']];
    const subdir = req.query['subdir'] || '';

    const mediaPath = path.join(group, subdir);
    const mediaType = mime.lookup(mediaPath);
    const stat = fs.statSync(mediaPath);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(mediaPath, {start, end});
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
        fs.createReadStream(mediaPath).pipe(res);
    }
});

module.exports.router = router;
module.exports.path = '/api';
