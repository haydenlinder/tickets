// When a client sends request for an endpoint using HTTP request(GET, POST, PUT, DELETE), we need to determine how the server will reponse by setting up the routes.

// These are our routes:

// /api/users     : GET, POST, DELETE
// /api/users/:id : GET, PUT, DELETE
// /api/users/acme: GET
// Create a turorial.routes.js inside app / routes folder with content like this:

module.exports = app => {
  const users = require("../../controllers/user.controller");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve all ACME Users
  router.get("/acme", users.findAllAcme);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Update a User with id
  router.put("/:id", users.update);

  // Delete a User with id
  router.delete("/:id", users.delete);

  // Create a new User
  router.delete("/", users.deleteAll);

  app.use('/api/users', router);
};




// You can see that we use a controller from / controllers / user.controller.js.

// We also need to include routes in server.js(right before app.listen()):

// ...

// require("./app/routes/turorial.routes")(app);

// // set port, listen for requests
// const PORT = ...;
// app.listen(...);