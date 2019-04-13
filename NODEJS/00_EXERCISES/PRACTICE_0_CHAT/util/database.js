const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '0.0.0.0',
    user: 'root',
    database: 'node_complete',
    password: 'root'
});

module.exports = pool.promise();