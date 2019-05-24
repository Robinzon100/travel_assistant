// const Joi = require("@hapi/joi");

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

//  USER validation schema
// const schema = require("../models/schemas/user");
// "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"

const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");

//? setting the meail api key

sgMail.setApiKey(
    "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"
);

//! MODELS
const Users = require("../models/users");

//
//? ─── REGISTRATION ───────────────────────────────────────────────────────────────
//

//? get the /registration

exports.getRegistration = (req, res, next) => {
    res.render("register", {
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

                            const msg = {
                                to: email,
                                from: "robinzon@gmail.com",
                                subject: "Sending with SendGrid is Fun",
                                text: "mametyna",
                                html: "mametyna"
                            };
                            sgMail.send(msg);
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
//?─── LOGIN ──────────────────────────────────────────────────────────────────────
//

//? GET the /login

exports.getLogin = (req, res, next) => {
    res.render("login", {
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
//?─── LOGOUT ─────────────────────────────────────────────────────────────────────
//

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        console.log(req.session);
        res.redirect("/tours");
    });
};

//
//?─── RESET-PASSWORD ──────────────────────────────────────────────────────────────────────
//

//? GET the /reset-password

exports.getResetPassword = (req, res, next) => {
    res.render("reset-password", {
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
                        req.flash("error","no acount found found with that email");
                        res.redirect("/reset-password");
                    }else{
                        Users.saveUserToken(email, token)
                        res.redirect("/reset-password");
                    }
                })
                .catch(err => console.log(err));
        }
    });
};
