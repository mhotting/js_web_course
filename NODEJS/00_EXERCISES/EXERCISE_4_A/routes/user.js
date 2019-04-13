// Route for the index page

const path = require('path');
const express = require('express');

const rootDir = require('./../util/path');

const router = express.Router();

router.get('/add-user', (req, res, next) => {
    res.render('user', { docTitle: 'Add user' });
});

const users = [];
router.post('/add-user', (req, res, next) => {
    users.push({ name: req.body.username });
    res.redirect('/');
});

module.exports.routes = router;
module.exports.users = users;