const express = require('express');
const app = express()
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const User = require("./models/User");
const bodyParser = require("body-parser");
const users = require("./routes/api/users")
const tickets = require("./routes/api/tickets")
const tags = require('./routes/api/tags')
const passport = require('passport');

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize())
require('./config/passport')(passport);

app.use("/api/users", users)    
app.use("/api/tickets", tickets)
app.use('api/tags', tags)

app.listen(port, () => console.log(`Server is running on port ${port}`));

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get("/", (req, res) => {
    const user = new User ({
        first_name: "jim2",
        last_name: "jones",
        email: "jim@catsforhumanity.org",
        password: "jimisgreat123"
    })
    user.save()
    res.send("Hello World!")
})

app.use("/api/users", users)   


app.listen(port, () => {console.log(`Server is running on port ${port}`)});


