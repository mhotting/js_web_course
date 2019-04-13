// Product model

const fs = require('fs');
const path = require('path');
const rootDir = require('./../util/path');

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (cbFunc) => {
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
    // Saves the current object into our product array
    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }
    // Fetches all the products using the array
    static fetchAll(cbFunc) {
        getProductsFromFile(cbFunc);
    }
};