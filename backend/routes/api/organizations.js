const express = require("express");
const router = express.Router();
const Organization = require("../../models/organization")


// Get all organizations
router.get('/', (req, res) => {
  Organization.find()
    .then(organizations => res.json(organizations))
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving organizations."
      });
    });
});


// Get one organization, by id
router.get("/:orgId", (req, res) => {
  const orgId = req.params.orgId;

  Organization.find({ _id: orgId })
    .then(organizations => res.json(organizations))
    .catch(err => {
      res.status(400).json({
        message:
          err.message || `No organization found with id=${orgId}`
      });
    });
});


// Get one organization, by handle
router.get("/handle/:handle", (req, res) => {
  const orgHandle = req.params.handle;
  Organization.find({ handle: orgHandle })
    .then(organizations => res.json(organizations))
    .catch(err => {
      res.status(400).json({
        message:
          err.message || `No organization found with handle=${orgHandle}`
      });
    });
});


// Get all users with the specified handle
router.get('/handle/:handle/users', (req, res) => {
  const orgHandle = req.params.handle;
  User.find({ orgHandle: orgHandle })
    .then(users => res.json(users))
    .then(orgHandle => res.json(orgHandle))
    .catch(err => {
      res.status(400).json({
        message:
          err.message || `No users found with orgHandle=${orgHandle}`
      });
    });
});


// Gets all users where orgHandle matches 
router.get('/handle/:handle/users/name/:nameFragment', (req, res) => {
  const orgHandle = req.params.handle;
  const nameFragment = req.params.nameFragment
  
  User.find({
    $and : [
      { orgHandle: orgHandle },
      { $or : [ 
        { firstName: { $regex: nameFragment, $options: "i" } }, 
        { lastName: { $regex: nameFragment, $options: "i" } }
      ]}]
      // $text: { $search: name} 
   })
    .then(users => {
      res.json(users)})
    .catch(err => {
      res.status(400).json({
        message:
          err.message || `No users found where orgHandle=${orgHandle} and firstName or lastName contains ${nameFragment}`
      });
    });
});

module.exports = router;