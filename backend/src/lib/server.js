'use strict'

import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
require('dotenv').config();

const app = express();
const router = express.Router();

// environment settings
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.DEV_URI;

// server settings & utilites
app.use(cors());
app.use(bodyParser.json());

const startServer = app.listen(PORT, () => { 
    console.log(`Server is listening on port: ${PORT}`);
})

const stopServer = () => {
    app.close(PORT, () => { console.log(`Shut down on port: ${PORT}`)})
}

// Router
const organizationsRouter = require("./routes/api/organizations");
const usersRouter = require("./routes/api/users");
const ticketsRouter = require("./routes/api/tickets");
const tagsRouter = require('./routes/api/tags');
const commentsRouter = require('./routes/api/comments');

app.use("/api/organizations", organizationsRouter);
app.use("/api/users", usersRouter);
app.use("/api/tickets", ticketsRouter);
app.use('api/tags', tagsRouter);
app.use('api/comments', commentsRouter);

// actually start the server
startServer();

// mongoose settings & utilities
mongoose.Promise = require('bluebird');
mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.on('connected', () => {
    console.log(`Database connection open to ${mongoose.connection.host} ${mongoose.connection.name}`);
});
mongoose.connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});


// app.use(require('../route/auth-router'));

app.all('*', (request, response) => {
    console.log('Returning a 404 from the catch-all route');
    return response.sendStatus(404);
});

// error middleware
app.use(require('./error-middleware'));


export const start = () => {
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`)
    })
}

export const stop = () => {
    app.close(PORT, () => {
        console.log(`Shut down on port: ${PORT}`)
    })
}