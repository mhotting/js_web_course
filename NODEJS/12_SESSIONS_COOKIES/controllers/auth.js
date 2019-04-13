const User = require('./../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isLoggedIn: req.session.isLoggedIn
    });
}

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    User.findById('5c9b45e489890b21990141d4')
        .then(user => {
            req.session.user = user;
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(error => {
        console.log(error);
        res.redirect('/');
    });
};