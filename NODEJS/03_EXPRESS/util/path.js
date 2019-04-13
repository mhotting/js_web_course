// Enables to use the main folder as a path from this module
const path = require('path');

module.exports = path.dirname(process.mainModule.filename);