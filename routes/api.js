const fs = require('fs');
const path = require('path');
const express = require('express');

const mime = require('mime-types');

const router = express.Router();

router.get('/', (req, res) => {
    let mediasDirectories = process.env['MEDIAS_DIRECTORIES'].split(':');
    res.send(mediasDirectories);
});

router.get('/:dir_id/', (req, res) => {
    let mediasDirectories = process.env['MEDIAS_DIRECTORIES'].split(':');
    const group = mediasDirectories[req.params['dir_id']];
    const subdir = req.query['subdir'] || '';

    const finalGroup = path.join(group, subdir);
    const dirs = fs.readdirSync(finalGroup).map((dirName) => path.join(finalGroup, dirName));

    const directories = dirs.reduce((array, filePath) => {
        try {
            if (fs.statSync(filePath).isDirectory()) {
                array.push({
                    url: '/media/' + req.params['dir_id'] + '/?subdir=' + path.join(subdir, path.basename(filePath)),
                    name: path.basename(filePath)
                });
            }
        } catch (ignore) {}
        return array;
    }, []);
    const files = dirs.reduce((array, filePath) => {
        try {
            const mimeType = mime.lookup(filePath);
            if (fs.statSync(filePath).isFile() && mimeType && mimeType.includes("video")) {
                array.push({
                    url: '/media/video/' + req.params['dir_id'] + '?subdir=' + path.join(subdir, path.basename(filePath)),
                    name: path.basename(filePath)
                });
            }
        } catch (ignore) {}
        return array;
    }, []);
    res.send({files, directories});
});

module.exports.router = router;
module.exports.path = '/api';
