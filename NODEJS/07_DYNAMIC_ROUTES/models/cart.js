const path = require('path');
const fs = require('fs');
const rootDir = require('./../util/path');

const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fectch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => finds existing product
            const existingProductIndex = cart.products.findIndex((product) => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add the new product / increase the quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = Number(cart.totalPrice) + Number(productPrice);
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        // Fectch the previous cart
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return ;
            }
            const cart = JSON.parse(fileContent);
            const updatedCart = {...cart};
            const productIndex = updatedCart.products.findIndex(product => product.id === id);
            if (productIndex === -1)
                return ;
            const productQty = updatedCart.products[productIndex].qty;
            updatedCart.totalPrice = cart.totalPrice - (productPrice * productQty);
            updatedCart.products = updatedCart.products.filter(
                product => product.id !== id
            );
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });
        });
    }

    static getCart(cb) {
        // Fectch the previous cart
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb(null);
            }
            const cart = JSON.parse(fileContent);
            cb(cart);
        });
    }

    static deleteItem(productId, productPrice, productQty) {
        // Fectch the previous cart
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return ;
            }
            const cart = JSON.parse(fileContent);
            const updatedProducts = cart.products.filter(product => product.id !== productId);
            const updatedTotalPrice = cart.totalPrice - (productQty * productPrice);
            const updatedCart = { products: updatedProducts, totalPrice: updatedTotalPrice };
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });
        });   
    }
};