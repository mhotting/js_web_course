// Index controller
const db = require('./../util/database');

exports.getIndex = (req, res, next) => {
    db.execute('SHOW TABLES')
        .then((result) => {
            console.log(result);
            res.render('index', { pageTitle: 'Accueil' });
        })
        .catch((err) => {
            console.log(err);
        });
};