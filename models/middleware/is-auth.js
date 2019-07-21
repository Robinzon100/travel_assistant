exports.adminAuth = (req, res, next) => {
    console.log(req.session.host);
    
    if (req.session.logedIn) {
        if (req.session.user) {
            if (req.session.user.role == "admin") {
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
