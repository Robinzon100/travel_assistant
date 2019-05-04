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

    // Joi.validate(
    //     { username, email, password, repeatpassword },
    //     schema.userSchema,
    //     (err, value) => {
    //         if (err === null) {
    //             //* if the registration GOES WELL
    //             const user = new Users(username, email, password);
    //             console.log("registration succsess");
    //             user.save()
    //                 .then(() => {
    //                     res.redirect("/tours");
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                 });
    //         } else {
    //             console.log(err);
    //         }
    //     }
    // );
 
};
