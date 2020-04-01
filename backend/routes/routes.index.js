const organizations = require('./api/organizations');
const users = require('./api/users');
const tickets = require('./api/tickets');
const comments = require('./api/comments');
const tags = require('./api/tags');

const routes = {};
routes.organizations = organizations;
routes.users = users;
routes.tickets = tickets;
routes.comments = comments;
routes.tags = tags;

module.exports = routes;
