//  
// const Joi = require("@hapi/joi");

//  USER validation schema
// const schema = require("../models/schemas/user");

//! MODELS
const Users = require("../models/users");





// === === === === ===
//? GET the /singlogin
// === === === === ===
exports.getRegistration = (req, res, next) => {
    res.render("register", {
        pageTitle: "travel assistant",
        path: "/register",
        errors: []
    });
};





// === === === === ===
//? POST the /singlogin AND validate user and save user
// === === === === ===
exports.postRegistration = (req, res, next) => {
    const { username, email, password, repeatpassword } = req.body;
    //? log errors
    let errors = [];

    const user = new Users(username, email, password);
    user.save()
        .then(() => {
            req.session.logedIn = true;
            res.redirect("/tours");
        })
        .catch(err => {
            console.log(err);
        });

    
     
};
