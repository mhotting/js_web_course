// Create a module for exporting the path of the project main directory

const path = require('path');
module.exports = path.dirname(process.mainModule.filename);