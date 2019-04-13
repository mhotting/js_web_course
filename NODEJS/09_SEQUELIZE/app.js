const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart_item');
const Order = require('./models/order');
const OrderItem = require('./models/order_item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // We are sure the user is going to be found because the app.js file is parsed one time and this part of the
    // code is executed only if we have incoming requests
    User
        .findByPk(1)
        .then(user => {
            // Don't forget that user is a Sequelize object and it has all of the methods included in it
            // We can add our user to the requests, then it will be accessible from every other middleware function
            req.user = user;
            next();
        })
        .catch(error => {
            console.log(error);
        });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

let fetchedUser;
sequelize
    //.sync({ force: true })
    .sync()
    .then(result => {
        return (User.findByPk(1));
    })
    .then(user => {
        if (!user) {
            return (User.create({ name: 'Mad', email: 'mad@test.com' }));
        } else {
            return (Promise.resolve(user));
        }
    })
    .then(user => {
        fetchedUser = user;
        return (user.getCart());
    })
    .then(cart => {
        if (!cart) {
            return (fetchedUser.createCart({}));
        } else {
            return (Promise.resolve(cart));
        }
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(error => {
        console.log(error);
    });