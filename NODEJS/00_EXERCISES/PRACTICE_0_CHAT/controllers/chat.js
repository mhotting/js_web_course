// Main chat page

const Message = require('./../models/message');

exports.getChat = (req, res, next) => {
    const username = req.query.username;
    Message.fetchAll((messages) => {
        res.render('chat', { pageTitle: 'Chat', username: username, messages: messages });
    });
};

exports.postMessage = (req, res, next) => {
    const username = req.body.username;
    const messageContent = req.body.message;
    const message = new Message(username, messageContent);
    message.save();
    res.redirect('/chat/chat?username=' + username);
};