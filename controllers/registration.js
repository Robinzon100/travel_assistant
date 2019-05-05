//!
const Joi = require("@hapi/joi");

//! MODELS
const Users = require("../models/users");

//! USER validation schema
const schema = require("../models/schemas/user");

// === === === === ===
//! GET the /singlogin
// === === === === ===
exports.getRegistration = (req, res, next) => {
    res.render("register", {
        pageTitle: "travel assistant",
        path: "/register",
        errors: []
    });
};

// === === === === ===
//! POST the /singlogin AND validate user and save user
// === === === === ===
exports.postRegistration = (req, res, next) => {
    const { username, email, password, repeatpassword } = req.body;
    //? log errors
    let errors = [];

    const user = new Users(username, email, password);
    user.save()
        .then(() => {
            res.redirect("/tours");
        })
        .catch(err => {
            console.log(err);
        });

    // req.session.logedIn = true;
    //  res.redirect('/');
};
