// Import modules
const express = require('express');
const postRoutes = require('./routes/posts.js');
const mongoose = require('mongoose');
require('dotenv').config();


// Declaration
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use('/posts', postRoutes);

// mongodb connection
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(PORT);
        console.log('connected to db');
    })
    .catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => {
    res.send("This is the homepage!");
});

// Server creation
// app.listen(PORT);