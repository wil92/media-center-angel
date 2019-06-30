const path = require('path');

const express = require('express');

const routes = require('./routes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes.loadRoutes(app);

module.exports = app;
