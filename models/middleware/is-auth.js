exports.adminAuth = (req, res, next) =>{
    if (!req.session.logedIn) {
        return res.redirect('/register');
    }
    next();
}