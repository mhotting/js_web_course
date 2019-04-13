// Create server and manage it

const express = require('express');

const app = express();
app.use((req, res, next) => {
    console.log('In the first Middleware!');
    next();
});
app.use('/users', (req, res, next) => {
    console.log('This is /users route');
    res.send('<h1>Users</h1>');
});
app.use('/', (req, res, next) => {
    console.log('Hello World!');
    res.send('<h1>Hello World!</h1>');
});
app.listen(3000, 'localhost');