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
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const repeatpassword = req.body.repeatpassword;

    //? log errors
    let errors = [];

    Joi.validate(
        { username, email, password, repeatpassword },
        schema.userSchema,
        (err, value) => {
            if (err === null) {
                //* if the registration GOES WELL
                const user = new Users(username, email, password);
                console.log("registration succsess");
                user.save()
                    .then(() => {
                        res.redirect("/tours");
                    })
                    .catch(err => {
                        console.log(err);
                    });

                //* if the registration FAILS
            } else {
                console.log("registration fail");
                //? check if the info is full
                if ( username == " " || email == " " || password == " " || repeatpassword == " ") {
                    errors.push("please enter in the fields");
                } else if ( username.trim() !== "" || email.trim() !== "" || password.trim() !== "" || repeatpassword.trim() !== "") {
                    errors.push("please enter whithout spaces");
                }

                //? checks the password and username TODO:LENGTH
                if (password.length <= 4 ) {
                    errors.push("password too short");
                }else if (password.length >= 30 ) {
                    errors.push("password too long");                    
                }

                if (username.length <= 4 ) {
                    errors.push("username too short");
                }else if (username.length >= 30 ) {
                    errors.push("username too long");                    
                }

                //? check if the passwords matches
                if (password != repeatpassword) {
                    errors.push("the passwords doesnt match");
                }

                //? check if there are TODO:NUMBERS
                function isNumeric(n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                }

                if (isNumeric(password)) {
                    errors.push("the password must contain at least one number");
                }

                if (password.match(/\d+/g) == null) {
                    errors.push("the password must contain at least one number");
                }

                //? check if the ERROR array is emty
                if (errors.length > 0) {
                    res.render("register", {
                        pageTitle: "travel assistant",
                        path: "/register",
                        errors: errors
                    });
                }
                // check if the ERROR array is emty SO THAT IT CAN CONTINUE IN DB
                else {
                    console.log("registration succsess");
                    const user = new Users(username, email, password);

                    user.save()
                        .then(() => {
                            res.redirect("/tours");
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
        }
    ); // err === null -> valid
};
