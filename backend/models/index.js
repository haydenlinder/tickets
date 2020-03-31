const models = {};
models.organization = require('./organization');
models.user = require('./user');
models.ticket = require('./ticket');
models.comment = require('./comment');
models.tag = require('./tag');

module.exports = models;