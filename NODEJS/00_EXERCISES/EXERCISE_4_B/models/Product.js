// Model that manages the product

const path = require('path');
const fs = require('fs');
const rootDir = require('../util/path');

// Defines the path of our products file
const p = path.join(rootDir, 'data', 'products.json');

// Reads from a file
const getDataFromFile = (cbFunc) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return (cbFunc([]));
        }
        cbFunc(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    // Constructor
    constructor(title) {
        this.title = title;
    }

    // Saves a product into our file
    save() {
        getDataFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    // Returns an array with all the products
    static fetchAll(cbFunc) {
        getDataFromFile(cbFunc);
    }
};