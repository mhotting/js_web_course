const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'node_complete',
    'root',
    'root',
    {
        dialect: 'mysql',
        host: '0.0.0.0'
    }
);

module.exports = sequelize;