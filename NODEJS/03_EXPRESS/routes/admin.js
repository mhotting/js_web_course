// Manages the routes from admin part of the site (form to add product)
const express = require('express');
const path = require('path');
const rootDir = require('./../util/path');
const router = express.Router();

router.get('/add_product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add_product.html'));
});

router.post('/add_product', (req, res, next) => {
    console.log(req.body.product);
    res.redirect('/');
});

module.exports = router;