const media = require('./media');
const views = require('./views');
const api = require('./api');

const routes = [
    media,
    views,
    api
];

module.exports.loadRoutes = (app) => {
    routes.forEach((router) => app.use(router.path || '', router.router));
    app.get('', (req, res) => res.redirect('media'));
};
