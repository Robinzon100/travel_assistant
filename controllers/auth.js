// const Joi = require("@hapi/joi");

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

//  USER validation schema
// const schema = require("../models/schemas/user");
// "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"

const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const mailer = require("../utils/mailer.js");
const { validationResult } = require("express-validator/check");

//! MODELS
const Users = require("../models/users");
const Host = require("../models/host");
const UserAndHostQueries = require("../queries/usersAndHost");

//
//! ─── REGISTRATION ───────────────────────────────────────────────────────────────
//

//!USER
//? get the /registration-user ---- USER
exports.getRegistration = (req, res, next) => {
    res.render("auth/register", {
        pageTitle: "travel assistant",
        path: "/register",
        errors: [],
        logedIn: req.session.logedIn,
        errorMessage: req.flash("error"),
        oldInputValues: {
            email: "",
            password: "",
            repeatPassword: ""
        }
    });
};

//? POST the /registration ---- USER
exports.postRegistration = (req, res, next) => {
    const { username, email, password, phone_number, repeatPassword } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());

        return res.status(422).render("auth/register", {
            pageTitle: "travel assistant",
            path: "/register",
            errors: [],
            logedIn: req.session.logedIn,
            errorMessage: errors.array(),
            oldInputValues: {
                username: username,
                email: email,
                phone_number: phone_number,
                password: password,
                repeatPassword: repeatPassword
            }
        });
    } else {
        bcrypt.hash(password, 12).then(hashedPassword => {
            const bookmarks = {
                items: []
            };
            const user = new Users(username, email, hashedPassword, phone_number, bookmarks);

            UserAndHostQueries.save("users", user)
                .then(() => {
                    req.session.logedIn = true;
                    req.session.user = user;
                    res.redirect("/explore");

                    // mailer.registrationMail(email);
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }
};


//!HOST
//? get the /registration ---- HOST
exports.getRegistrationHost = (req, res, next) => {
    res.render("auth/register-host", {
        pageTitle: "register a host",
        path: "/register",
        errors: [],
        logedIn: req.session.logedIn,
        errorMessage: req.flash("error"),
        oldInputValues: {
            email: '',
            password: '',
            name: '',
            website: '',
            telephone: '',
            type: '',
            isACompany: '',
            bio: ''
        }
    });
};

//? POST the /registration ---- HOST
exports.postRegistrationHost = (req, res, next) => {
    const { name, email, password, repeatPassword, telephone, website, type } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());

        return res.status(422).render("auth/register-host", {
            pageTitle: "registe a host",
            path: "/register-host",
            errors: [],
            logedIn: req.session.logedIn,
            errorMessage: errors.array(),
            oldInputValues: {
                name: name,
                email: email,
                password: password,
                telephone: telephone,
                repeatPassword: repeatPassword,
                website: website,
                type: type
            }
        });
    } else {
        bcrypt.hash(password, 12).then(hashedPassword => {
            const host = new Host(email, hashedPassword, name, website, telephone, type);

            UserAndHostQueries.save("hosts", host)
                .then(() => {
                    req.session.logedIn = true;
                    req.session.host = host;
                    res.redirect("/explore");
                    // mailer.registrationMail(email);
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }
};

//
//!─── LOGIN ──────────────────────────────────────────────────────────────────────
//

//? GET the /login ---- USER
exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        pageTitle: "login",
        path: "/register",
        errors: [],
        logedIn: req.session.logedIn,
        errorMessage: req.flash("error"),
        oldInputValues: {
            email: req.email,
            password: req.password
        }
    });
};

//? POST the /singlogin ---- USER
exports.postLogin = (req, res, next) => {
    const { email, password, isAHost } = req.body;

    if (isAHost == 'on') {
        UserAndHostQueries.findByEmail('hosts', email)
            .then(host => {
                if (!host) {
                    req.flash("error", "invalid email or password");
                    res.render("auth/login", {
                        pageTitle: "login",
                        path: "/register",
                        errors: [],
                        logedIn: req.session.logedIn,
                        errorMessage: req.flash("error"),
                        oldInputValues: {
                            email: email,
                            password: password
                        }
                    })
                } else {
                    bcrypt
                        .compare(password, host.password)
                        .then(domatch => {
                            if (domatch) {
                                req.session.host = host;
                                req.session.logedIn = true;
                                req.session.save(err => {
                                    console.log(err);
                                    res.redirect("/explore");
                                });
                            }
                        })

                }

            })

    } else {
        UserAndHostQueries.findByEmail("users",email)
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
                                    res.redirect("/explore");
                                });
                            } else {
                                req.flash("error", "invalid email or password");
                                // res.redirect("/login");
                                res.render("auth/login", {
                                    pageTitle: "login",
                                    path: "/register",
                                    errors: [],
                                    logedIn: req.session.logedIn,
                                    errorMessage: req.flash("error"),
                                    oldInputValues: {
                                        email: email,
                                        password: password
                                    }
                                });
                            }
                        })
                        .catch(err => console.log(err));
                } else {
                    req.flash("error", "invalid email or password");
                    res.render("auth/login", {
                        pageTitle: "login",
                        path: "/register",
                        errors: [],
                        logedIn: req.session.logedIn,
                        errorMessage: req.flash("error"),
                        oldInputValues: {
                            email: email,
                            password: password
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


};




//
//!─── LOGOUT ─────────────────────────────────────────────────────────────────────
//

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        console.log(req.session);
        res.redirect("/explore");
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
            if (user && user.resetTokenExpiration > Date.now()) {
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
                            user.resetToken = undefined;
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
