const fs = require('fs');

const requestHandler = (req, res) => {
    // Sending a response
    const url = req.url;
    const method = req.method;
    res.setHeader('Content-Type', 'text/html');
    if (url === '/') {
        res.write(
            '<html>' +
            '<header><title>TestPage</title></header>' +
            '<body><h3>Send a message lol:</h3>' +
            '<form action="/message" method="POST">' +
            '<input type="text" name="message">' +
            '<button type="submit">SEND</button>' +
            '</form>' +
            '</body>' +
            '</html>'
        );
        return (res.end());
    }
    else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return (req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return (res.end());
            });
        }));
    }
    res.write(
        '<html>' +
        '<header><title>TestPage</title></header>' +
        '<body><h1>Welcome to my NodeJS Server!</h1></body>' +
        '</html>'
    );
    res.end();
}

module.exports = {
    handler: requestHandler
};