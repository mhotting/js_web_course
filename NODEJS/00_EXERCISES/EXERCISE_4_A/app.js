// Create and manage nodeJS server using Express
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// Module with project path
const rootDir = require('./util/path');

const app = express();

// Setting up the template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Importing routes
const userData = require('./routes/user');
const indexRoute = require('./routes/index');

// Enable data parsing
app.use(bodyParser.urlencoded({ extended: false }));

// Turn on read rights on public directory
app.use(express.static(path.join(rootDir, 'public')));

// Enable the routes
app.use(indexRoute);
app.use(userData.routes);

// Dealing with no existing routes
app.use('/', (req, res, next) => {
    res.status(404).render('error', { docTitle: 'ERROR 404' });
});

// Enable server listening
app.listen(3000, 'localhost');