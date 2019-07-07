const media = require('./media');
const views = require('./views');
const server = require('./server');

const routes = [
    media,
    views,
    server
];

module.exports.loadRoutes = (app) => {
    routes.forEach((router) => app.use(router.path || '', router.router));
    app.get('', (req, res) => res.redirect('media'));
};
