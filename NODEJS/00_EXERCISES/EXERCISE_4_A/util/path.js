// Module that enables user to get the project main dir path
const path = require('path');
module.exports = path.dirname(process.mainModule.filename);