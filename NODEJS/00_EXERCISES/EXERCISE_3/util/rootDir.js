// Enables us to have a variable containing the project's path
const path = require('path');

module.exports = path.dirname(process.mainModule.filename);