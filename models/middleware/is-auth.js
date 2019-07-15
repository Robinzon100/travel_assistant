exports.adminAuth = (req, res, next) => {
    if (req.session.logedIn) {
        if (req.session.user.role || req.session.host.role) {
            if (req.session.user.role == "admin" || req.session.user.role == "admin") {
                return next();
            } else {
                return res.redirect("/explore");
            }
        } else {
            return res.redirect("/explore");
        }
    } else {
        return res.redirect("/explore");
    }
};
