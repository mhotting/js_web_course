const path = require('path');
const fs = require('fs');
const rootDir = require('./../util/path');

const p = path.join(rootDir, 'data', 'messages.json');

module.exports = class Message {
    // Constructor
    constructor(username, message) {
        this.username = username;
        this.message = message;
    }

    // Save the current message to the file
    save() {
        fs.readFile(p, (err, fileContent) => {
            let messages;
            if (err) {
                messages = [];
                messages.push({ username: this.username, message: this.message });
                fs.writeFile(p, JSON.stringify(messages), (err) => {
                    console.log(err);
                });
            } else {
                messages = JSON.parse(fileContent);
                const updatedMessages = [...messages, { username: this.username, message: this.message }];
                fs.writeFile(p, JSON.stringify(updatedMessages), (err) => {
                    console.log(err);
                });
            }
        });
    }

    // Return the array of all the messages
    static fetchAll(cbFunc) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cbFunc([]);
            } else {
                const messages = JSON.parse(fileContent);
                cbFunc(messages);
            }
        });
    }
};