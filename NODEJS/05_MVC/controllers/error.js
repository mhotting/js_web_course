// Error 404 controller

exports.getError = (req, res, next) => {
    res.status(404).render('404', { docTitle: 'ERROR 404', path: 'error' });
}