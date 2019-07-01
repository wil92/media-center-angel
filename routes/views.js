const fs = require('fs');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    let mediasDirectories = process.env['MEDIAS_DIRECTORIES'];
    mediasDirectories = mediasDirectories || [];
    if (typeof mediasDirectories === 'string') {
        mediasDirectories = [mediasDirectories];
    }
    const directories = mediasDirectories.map((dir, index) => ({url: '/media/' + index, name: dir})) ;
    res.render('groups-list', {directories})
});

router.get('/:dir_id/', (req, res) => {
    let mediasDirectories = process.env['MEDIAS_DIRECTORIES'];
    mediasDirectories = mediasDirectories || [];
    if (typeof mediasDirectories === 'string') {
        mediasDirectories = [mediasDirectories];
    }
    const directories = mediasDirectories.reduce((array, path) => {
        if (fs.statSync(path).isDirectory()) {
            array.push(path);
        }
        return array;
    }, []);

    // const directories = mediasDirectories.reduce((array, path) => {
    //     if (fs.statSync(path).isDirectory()) {
    //         array.push(path);
    //     }
    //     return array;
    // }, []);
    res.render('index', {title: 'medias'});
});

router.get('/video/:video_id', (req, res) => {
    const videoId = req.params['video_id'];
    res.render('index', {title: videoId});
});

module.exports.router = router;
module.exports.path = '/media';
