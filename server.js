const express = require('express');

const routes = require('./routes');

const app = express();

routes.loadRoutes(app);

module.exports = app;
