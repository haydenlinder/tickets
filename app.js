const bodyParser = require('body-parser')
const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
const path = require('path');

const db = require('./config/keys').mongoURI;
const port = process.env.PORT || 5000;
require('./config/passport')(passport);


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = { origin: 'http://localhost:5001' };
app.use(cors(corsOptions));

app.use(passport.initialize())

// application routing
const paths = {
  organizations: '/api/organizations',
  users: '/api/users',
  tickets: '/api/tickets',
  comments: '/api/comments',
  tags: '/api/tags'
};
const routes = require('./backend/routes/routes.index');
// app.use(paths.organizations, routes.organizations);
app.use(paths.users, routes.users);
app.use(paths.tickets, routes.tickets);
app.use(paths.comments, routes.comments);
app.use(paths.tags, routes.tickets);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

app.listen(port, () => 
    console.log(`Entry file: Server is running. App is listening on port ${port}`)
    );

mongoose.set('useCreateIndex', true);

mongoose
    .connect(db, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Entry file: Successfully connected to MongoDB"))
    .catch(err => console.log(err));
