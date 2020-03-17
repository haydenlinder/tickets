const express = require("express");
const router = express.Router()
const User = require("../../models/User")
const bcrypt = require("bcryptjs")


router.get("/test", (req, res) => {
    res.json({ msg: "this is the user route" })
})

router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email })
    .then((user) => {
        if (user) {
            return res.status(400).json({email: "A user is already registered with that email"})
        } else {
            const orgName = req.body.email.slice(req.body.email.search("@"));
            const newUser = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                organization: orgName,
                password: req.body.password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err))
                })
            })
        }
    })
})


module.exports = router