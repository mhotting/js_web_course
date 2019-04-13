// Creating a NodeJS server listening on 4000 port

// Importing modules
const http = require('http');
const routes = require('./routes.js');

// Creating server
const server = http.createServer(routes.handler);

// Creating the server event listener
server.listen(4000, 'localhost');