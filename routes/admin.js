const express = require('express');
const app = express();
const router = express.Router();
const { check, body } = require("express-validator/check");

// ─── CONTROLERS ──────────────────────────────────────────────────────────────────
const adminControllers = require('../controllers/admin');

//
// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
//
const isAuth = require('../models/middleware/is-auth');

router.get("/add-tour", isAuth.adminAuth, adminControllers.getAddTour);

router.post("/add-tour", isAuth.adminAuth,
    // [
    //     //title
    //     check("title")
    //         .not()
    //         .isEmpty()
    //         .withMessage('title musnt be empty')
    //         .trim()
    //         .isLength({ min: 5, max: 50 })
    //         .withMessage('title musnt be more than 5 characers and less than 50'),

    //     //title
    //     check("price")
    //         .not()
    //         .isEmpty()
    //         .withMessage('price musnt be empty')
    //         .trim()
    //         .isInt({ min: 10, max: 99999 })
    //         .withMessage('price value is too much and not an number'),

    //     check("small_description")
    //         .not()
    //         .isEmpty()
    //         .withMessage('small_description musnt be empty')
    //         .trim()
    //         .isLength({ min: 5, max: 80 })
    //         .withMessage('title musnt be more than 5 characers and less than 80'),

    //     check("long_description__title")
    //         .not()
    //         .isEmpty()
    //         .withMessage('long_description__title musnt be empty')
    //         .trim()
    //         .isLength({ min: 40, max: 90 })
    //         .withMessage('title musnt be more than 40 characers and less than 90'),

    //     check("long_description__text")
    //         .not()
    //         .isEmpty()
    //         .withMessage('long_description__text musnt be empty')
    //         .trim()
    //         .isLength({ min: 150, max: 500 })
    //         .withMessage('title musnt be more than 5 characers and less than 500'),


    //     // body("card_image")
    //     //     .not()
    //     //     .isEmpty()
    //     //     .withMessage('image musnt be empty')
    //     // //Password
    //     // body("password", "password must be at least 5 characters long")
    //     //     .trim()
    //     //     .isLength({ min: 5, max: 20 }),

    //     //Repeat password
    //     // body("repeatPassword").custom((value, { req }) => {

    //     // })
    // ],
    adminControllers.postAddTour);


module.exports = router;