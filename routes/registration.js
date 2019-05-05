const express = require("express");
const router = express.Router();
const { check } = require("express-validator/check");

// ─── CONTROLERS ──────────────────────────────────────────────────────────────────
const registrationsConntrlers = require("../controllers/registration");

router.get("/signlogin",registrationsConntrlers.getRegistration);
router.post("/signlogin", registrationsConntrlers.postRegistration);

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
//     registrationsConntrlers.getRegistration
// );
