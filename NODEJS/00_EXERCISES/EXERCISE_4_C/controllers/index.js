exports.getIndex = (req, res, next) => {
    res.render('shop/index', {
        pageTitle: 'Welcome',
        path: '/',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
  });
};