// create a new Object: object.save()
// find a Object by id: findById(id)
// retrieve all Objects: find()
// update a Object by id: findByIdAndUpdate(id, data)
// remove a Object: findByIdAndRemove(id)
// remove all Objects: deleteMany()
// find all Objects by title: find({ title: { $regex: new RegExp(title), $options: “i” } })
// These functions will be used in our Controller.

// Create the Controller
// Inside app / controllers folder, let’s create user.controller.js with these CRUD functions:

// create
// findAll
// findOne
// update
// delete
//   deleteAll
// findAllPublished
// const db = require("../models");
// const Object = db.users;

const dbModels = require('../models/index');
const User = dbModels.user;

// Create and Save a new User:
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users / find by orgHandle from the database:
exports.findAll = (req, res) => {
  // We use req.query.orgHandle to get query string from the Request and consider it as condition for findAll() method.
  const orgHandle = req.query.orgHandle;
  var condition = orgHandle ? { orgHandle: { $regex: new RegExp(orgHandle), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id:
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not User found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Update the User with the id specified in the request:
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete the User with the id specified in the request:
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database:
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

// Find all Users by condition:
// Find all Users where (orgHandle === 'acme.boom'):
exports.findAllAcme = (req, res) => {
  User.find({ orgHandle: 'acme.boom' })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};
