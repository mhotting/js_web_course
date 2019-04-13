// Managing DB connections

const mysql = require('mysql2');

const pool = mysql.createPool({
    user: "root",
    password: "root",
    database: "node_complete_8",
    host: "0.0.0.0"
});

module.exports = pool.promise();