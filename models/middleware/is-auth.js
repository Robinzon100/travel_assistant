exports.adminAuth = (req, res, next) => {
    if (req.session.logedIn) {
        if (req.session.user.role) {
            if (req.session.user.role == "admin") {
                return next();
            } else {
                return res.redirect("/tours");
            }
        } else {
            return res.redirect("/tours");
        }
    } else {
        return res.redirect("/tours");
    }
};
