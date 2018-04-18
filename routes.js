const routes = require('express').Router();
const vote = require('./routes/vote');

routes.use('/vote', vote);

module.exports = routes;
