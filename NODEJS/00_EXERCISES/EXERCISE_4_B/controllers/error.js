// Error 404 controller

exports.getError = (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
};