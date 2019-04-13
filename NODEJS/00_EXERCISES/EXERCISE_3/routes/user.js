// Managing the user routes
const express = require('express');
const path = require('path');
const rootDir = require('../util/rootDir');

const router = express.Router();

router.get('/user', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'user.html'));
});

router.post('/add_user', (req, res, next) => {
    console.log(req.body.user);
    res.redirect('/');
});

module.exports = router;