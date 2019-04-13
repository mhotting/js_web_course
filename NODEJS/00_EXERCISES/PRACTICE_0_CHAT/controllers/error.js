// Error controller

exports.getError = (req, res, next) => {
    res.render('error', { pageTitle: 'ERREUR 404' });
};