// Import the http module from core of NodeJS
const http = require('http');
const fs = require('fs');
const routes = require('./routes.js');

// Creating a server
const server = http.createServer(routes.handler);

// Launching the server
server.listen(3000, 'localhost');