// Route for the index page

const path = require('path');
const express = require('express');

// Importing for users tab
const userData = require('./user');

const rootDir = require('./../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', { docTitle: 'Welcome', users: userData.users });
});

module.exports = router;