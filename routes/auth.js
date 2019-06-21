const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator/check");

//
// ─── MY IMPORTS ─────────────────────────────────────────────────────────────────
//
const Users = require("../models/users");

// ─── CONTROLERS ──────────────────────────────────────────────────────────────────
const auth = require("../controllers/auth");

//
// ?─── REGISTRATION ROUTES ────────────────────────────────────────────────────────────
//
router.get("/register", auth.getRegistration);
router.post("/register",
    [
        //Email
        check("email")
            .not()
            .isEmpty()
            .withMessage('email musnt be empty')
            .trim()
            .isEmail()
            .withMessage('enter a valid email')
            .custom((value, { req }) => {
                return Users.findByEmail(value).then(user => {
                    if (user) {
                        return Promise.reject("User Already Exists");
                    }
                });
            }),

        //Password
        body("password", "password must be at least 5 characters long")
            .trim()
            .isLength({ min: 5, max: 20 }),

        //Repeat password
        body("repeatPassword").custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords must match !");
            } else {
                return true;
            }
        })
    ],
    auth.postRegistration
);

//
// ?─── LOGIN ROUTES ────────────────────────────────────────────────────────────
//
router.get("/login", auth.getLogin);
router.post("/login", auth.postLogin);

//
// ?─── RESET PASSWORD  ROUTES ────────────────────────────────────────────────────────────
//
router.get("/reset-password", auth.getResetPassword);
router.post("/reset-password", auth.postResetPassword);

//
// ?─── NEW PASSWORD  ROUTES ────────────────────────────────────────────────────────────
//
router.get("/new-password/:token", auth.getNewPassword);
router.post("/new-password/:token", auth.postNewPassword);

//
// ?─── LOG OUT  ROUTES ────────────────────────────────────────────────────────────
//
router.post("/logout", auth.postLogout);

module.exports = router;

// router.get(
//     "/signlogin",
//     [
//         check("email").custom(value => {
//             return User.findByEmail(value).then(user => {
//                 if (user) {
//                     return Promise.reject("E-mail already in use");
//                 }
//             });
//         }),
//         check("password").custom((value, { req }) => {
//             if (value !== req.body.passwordConfirmation) {
//                 throw new Error("Password confirmation is incorrect");
//             }
//         })
//     ],
//     auth.getRegistration
// );