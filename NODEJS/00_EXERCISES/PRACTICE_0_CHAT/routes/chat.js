// Chat route

const express = require('express');
const chatController = require('./../controllers/chat');

const router = express.Router();

router.get('/chat', chatController.getChat);
router.post('/post-message', chatController.postMessage);

module.exports = router;