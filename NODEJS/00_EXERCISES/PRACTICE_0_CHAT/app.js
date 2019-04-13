/*  
    Create and manage server
    Mad
    19/03/2019
*/

// Require modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Creating the app
const app = express();

// Template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Require rootDir and routes
const rootDir = require('./util/path');
const errorController = require('./controllers/error');
const chatRoutes = require('./routes/chat');
const indexRoutes = require('./routes/index');

// Parsing data
app.use(bodyParser.urlencoded({ extended: false }));

// Enable read access of public directory
app.use(express.static(path.join(rootDir, 'public')));

// Use the roots
app.use('/chat', chatRoutes);
app.use(indexRoutes);
app.use('/', errorController.getError);

// Launch server listening requests
app.listen(3000, 'localhost');