// Creates a server and manages it

// Modules importation
const express = require('express');
const path = require('path');
const rootDir = require('./util/rootDir');
const bodyParser = require('body-parser');

// Importing the routes
const mainRoutes = require('./routes/main.js');
const userRoutes = require('./routes/user.js');

// Creating the app
const app = express();

// Serving files statically -> enable read access to some files
app.use(express.static(path.join(rootDir, 'public')));

// Enable the parsing of the requests bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Managing the routes
app.use(userRoutes);
app.use(mainRoutes);
app.use('/', (req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

app.listen(3000, 'localhost');