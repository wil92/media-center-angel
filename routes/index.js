const media = require('./media');
const views = require('./views');

const routes = [
    media,
    views
];

module.exports.loadRoutes = (app) => {
    routes.forEach((router) => app.use(router.path || '', router.router));
};
