// Controller of the products

const Product = require('./../models/product');

// Get the product form to add one
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        docTitle: 'Add Product',
        path: 'add-product',
        formsCSS: true,
        productCSS: true
    });
};

// Product adding checker
exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

// Get the products information
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop', {prods: products, docTitle: 'Shop', path: 'shop' });
    });
};