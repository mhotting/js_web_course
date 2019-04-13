// Controller of the products

const Product = require('./../models/Product');

// Get add-product page with the form
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
};

// Post the form to add product
exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

// Get all the products
exports.getAllProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
        });
    });
    
};