const db = require('./../util/database');

module.exports = class Cart {
  static countProd(id) {
    return (db.execute('SELECT COUNT(*) AS cpt FROM cart WHERE idProduct = ?', [id]));
  }

  static addProduct(id) {
    return (this.countProd(id)
      .then(([row]) => {
        if (row[0].cpt === 0) {
          return (db.execute('INSERT INTO cart(idProduct, qty) VALUES (?, ?);', [id, 1]));
        }
        else {
          return (db.execute('UPDATE cart SET qty = qty + 1 WHERE idProduct = ?;', [id]));
        }
      })
      .catch(err => {
        console.log(err);
      }));
  }

  static deleteProduct(id) {
    return (db.execute('DELETE FROM cart WHERE idProduct = ?;', [id]));
  }

  static getCart() {
    return (db.execute('SELECT products.id as id, products.title as title, products.price as price, cart.qty as qty FROM cart INNER JOIN products ON products.id = cart.idProduct;'));
  }

  static getPrice() {
    return (db.execute('SELECT SUM(products.price * cart.qty) AS total FROM cart INNER JOIN products ON cart.idProduct = products.id;'));
  }
};
