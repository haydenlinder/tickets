// DATABASE SETUP
const mongoose = require('mongoose'); //mongoose connects app to MongoDB
const port = process.env.PORT || 5000;  
app.listen(port, () => console.log(`Server is running on port ${port}`));
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));


// ROUTES SETUP
const express = require('express');  //creates a new Express server
const app = express();  //app is an invocation of our express server

// ROUTES
// root route
app.get("/", (req, res) => { res.send("Hello World!") });
// import users routes, use with users paths
const users = require("./routes/api/users");
app.use("/api/users", users);
// import tickets routes, use with tickets paths
const tickets = require("./routes/api/tickets");
app.use("/api/tickets", tickets);
// import tags routes, use with tags paths
const tags = require('./routes/api/tags');
app.use('api/tags', tags);


// USER AUTH
const passport = require('passport');
app.use(passport.initialize())
require('./config/passport')(passport);

 
// https://www.npmjs.com/package/body-parser
// imports body-parser so that we can parse the JSON we send to our frontend
const bodyParser = require('body-parser');
// sets up middleware needed for body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());