const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.get('/reset', authController.getReset);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/signup', authController.postReset);

router.post('/logout', authController.postLogout);

module.exports = router;