const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
Product
  .findAll()
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(error => {
    console.log(error);
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({
    where: {
      id: prodId
    }
  })
    .then(products => {
      res.render('shop/product-detail', {
        product: products[0],
        pageTitle: products[0].title,
        path: '/products'
      });
    })
    .catch(error => {
      console.log(error);
    });
/*
  // Alternative method
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(error => {
      console.log(error);
    });
    */
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      return (cart.getProducts());
    })
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return (cart.getProducts({ where: { id: prodId } }));
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        newQuantity = product.cartItem.quantity + 1;
      }
      return (Product.findByPk(prodId));
    })
    .then(product => {
      return (fetchedCart.addProduct(product, { through: { quantity: newQuantity } }));
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(error => {
      console.log(cart);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return (cart.getProducts({ where: { id: prodId } }));
    })
    .then(products => {
      const product = products[0];
      return (product.cartItem.destroy());
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(error => console.log(error));
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
    .then(orders => {
      console.log(orders);
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(error => console.log(error));
};

exports.postOrders = (req, res, next) => {
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return (req.user.createOrder());
    })
    .then(order => {
      fetchedCart.getProducts()
        .then(products => {
          console.log(products);
          for (let prod of products) {
            order.addProduct(prod, { through: { quantity: prod.cartItem.quantity } })
              .then(result => result)
              .catch(error => console.log(error));
          }
          return (fetchedCart.destroy());
        })
        .catch(error => console.log(error));
    })
    .then(result => {
      return (req.user.createCart());
    })
    .then(cart => {
      return (req.user.getOrders());
    })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(error => console.log(error));

  
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
