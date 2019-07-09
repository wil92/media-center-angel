const media = require('./media');
const views = require('./views');
<<<<<<< HEAD
const api = require('./api');
=======
const server = require('./server');
>>>>>>> a96e79299762cebab50c74dae8224c3b7f629226

const routes = [
    media,
    views,
<<<<<<< HEAD
    api
=======
    server
>>>>>>> a96e79299762cebab50c74dae8224c3b7f629226
];

module.exports.loadRoutes = (app) => {
    routes.forEach((router) => app.use(router.path || '', router.router));
    app.get('', (req, res) => res.redirect('media'));
};
