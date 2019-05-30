// const Joi = require("@hapi/joi");

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

//  USER validation schema
// const schema = require("../models/schemas/user");
// "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"

const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const mailer = require("../utils/mailer.js");

//! MODELS
const Users = require("../models/users");

//
//! ─── REGISTRATION ───────────────────────────────────────────────────────────────
//

//? get the /registration
exports.getRegistration = (req, res, next) => {
    res.render("auth/register", {
        pageTitle: "travel assistant",
        path: "/register",
        errors: [],
        logedIn: req.session.logedIn,
        errorMessage: req.flash("error")
    });
};

//? POST the /registration
exports.postRegistration = (req, res, next) => {
    const { username, email, password } = req.body;

    Users.findByEmail(email)
        .then(user => {
            if (user) {
                req.flash("error", "user already exists");
                res.redirect("/register");
            } else {
                return bcrypt.hash(password, 12).then(hashedPassword => {
                    const user = new Users(username, email, hashedPassword);
                    user.save()
                        .then(() => {
                            req.session.logedIn = true;
                            req.session.user = user;
                            res.redirect("/tours");

                            mailer.registrationMail(email);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });
            }
        })
        .catch(err => console.log(err));
};

//
//!─── LOGIN ──────────────────────────────────────────────────────────────────────
//

//? GET the /login
exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        pageTitle: "login",
        path: "/register",
        errors: [],
        logedIn: req.session.logedIn,
        errorMessage: req.flash("error")
    });
};

//? POST the /singlogin
exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;

    Users.findByEmail(email)
        .then(user => {
            if (user) {
                bcrypt
                    .compare(password, user.password)
                    .then(domatch => {
                        if (domatch) {
                            req.session.user = user;
                            req.session.logedIn = true;
                            req.session.save(err => {
                                console.log(err);
                                res.redirect("/tours");
                            });
                        } else {
                            req.flash("error", "invalid email or password");
                            res.redirect("/login");
                        }
                    })
                    .catch(err => console.log(err));
            } else {
                req.flash("error", "invalid email or password");
                res.redirect("/login");
            }
        })
        .catch(err => {
            console.log(err);
        });
};

//
//!─── LOGOUT ─────────────────────────────────────────────────────────────────────
//

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        console.log(req.session);
        res.redirect("/tours");
    });
};

//
//!─── RESET-PASSWORD ──────────────────────────────────────────────────────────────────────
//

//? GET the /reset-password
exports.getResetPassword = (req, res, next) => {
    res.render("auth/reset-password", {
        pageTitle: "reset password",
        path: "/reset-password",
        errors: [],
        logedIn: req.session.logedIn,
        errorMessage: req.flash("error")
    });
};

//? POST the /reset-password
exports.postResetPassword = (req, res, next) => {
    const { email } = req.body;

    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect("/reset-password");
        } else {
            const token = buffer.toString("hex");

            Users.findByEmail(email)
                .then(user => {
                    if (!user) {
                        req.flash(
                            "error",
                            "no acount found found with that email"
                        );
                        res.redirect("/reset-password");
                    } else {
                        mailer.resetPasswordMail(email, token);
                        Users.saveAndUpdateUserToken(email, token);
                        res.redirect("/reset-password");
                    }
                })
                .catch(err => console.log(err));
        }
    });
};

//
//!─── NEW-PASSWORD ──────────────────────────────────────────────────────────────────────
//

//? GET the /reset-password
exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;

    Users.findUserByToken(token)
        .then(user => {
            if (user) {
                res.render("auth/new-password", {
                    pageTitle: "new password",
                    path: "/new-password",
                    errors: [],
                    logedIn: req.session.logedIn,
                    errorMessage: req.flash("error"),
                    userId: user._id
                });
            } else {
                req.flash("error", "no acount found found with that email");
                res.redirect("/reset-password");
            }
        })
        .catch(err => console.log(err));
};

//? POST the /reset-password
exports.postNewPassword = (req, res, next) => {
    const { userId } = req.body;
    const token = req.params.token;
    const newPassword = req.body.password;

    Users.findById(userId)
        .then(user => {
            if (!user) {
                req.flash("error", "the user you provided is not valide");
                res.redirect(`/new-password/${token}`);
            } else {
                return bcrypt.hash(newPassword, 12).then(hashedPassword => {
                    Users.updateUserPassword(userId, hashedPassword)
                        .then(user => {
                            res.redirect("/login");
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });
            }
        })
        .catch(err => console.log(err));
};
