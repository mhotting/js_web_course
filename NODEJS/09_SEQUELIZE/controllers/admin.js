const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // Once two tables are associated, objects from one has sort of magic methods
  // which enable to add data that are linked to the objects.
  req.user.createProduct({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description
    })
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user.getProducts({ where: { id: prodId } })
    .then(products => {
      if (products.length === 0) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: products[0]
      });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product
    .findByPk(prodId)
    .then(product => {
      if (product) {
        Product
        .update({
          title: updatedTitle,
          price: updatedPrice,
          description: updatedDesc,
          imageUrl: updatedImageUrl
        }, {
          where: { id: prodId }
        })
        .then(result => {
          res.redirect('/admin/products');
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        res.redirect('/admin/products');
      } 
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product
    .findByPk(prodId)
    .then(product => {
      if (!product) {
        res.redirect('/admin/products');
      } else {
        Product
          .destroy({
            where: { id: prodId }
          })
          .then(result => {
            res.redirect('/admin/products');
          })
          .catch(error => {
            console.log(error);
          });
      }
    })
    .catch(error => {
      console.log(error);
    });
};
