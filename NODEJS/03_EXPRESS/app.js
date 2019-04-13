// Server creation and management

const express = require('express');
const path = require('path');
const rootDir = require('./util/path');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop');

const app = express();

// Parses the url for form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Error behaviour
app.use('/', (req, res, next) => {
    res.status(404);
    res.sendFile(path.join(rootDir, 'views', 'error.html'));
});

app.listen(3000, 'localhost');