const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'welcome'});
});

module.exports.router = router;
module.exports.path = '';
