const { check, body } = require("express-validator/check");

exports.cafeBody = [
    //! === === title
    check("title", "small_description")
        .not()
        .isEmpty()
        .withMessage("title musnt be empty")
        .trim()
        .isLength({ min: 5, max: 50 })
        .withMessage("title musnt be more than 5 characers and less than 50"),

    // //! === === small description
    // check("small_description")
    //     .not()
    //     .isEmpty()
    //     .withMessage("small_description musnt be empty")
    //     .trim()
    //     .isLength({ min: 5, max: 80 })
    //     .withMessage("title musnt be more than 5 characers and less than 80"),

    // //! === === establishment name
    // check("establishment_name")
    //     .not()
    //     .isEmpty()
    //     .withMessage("small_description musnt be empty")
    //     .trim()
    //     .isLength({ min: 5, max: 80 })
    //     .withMessage("title musnt be more than 5 characers and less than 80"),

    // //! === === long description -- title
    // check("long_description__title")
    //     .not()
    //     .isEmpty()
    //     .withMessage("small_description musnt be empty")
    //     .trim()
    //     .isLength({ min: 5, max: 80 })
    //     .withMessage("title musnt be more than 5 characers and less than 80"),

    // //! === === long description -- text
    // check("long_description__text")
    //     .not()
    //     .isEmpty()
    //     .withMessage("small_description musnt be empty")
    //     .trim()
    //     .isLength({ min: 5, max: 80 })
    //     .withMessage("title musnt be more than 5 characers and less than 80"),

    // //! === === rules
    // check("rules")
    //     .not()
    //     .isEmpty()
    //     .withMessage("images mustn't be empty")
    //     .trim()
    //     .isLength({ min: 5, max: 80 })
    //     .withMessage("title musnt be more than 5 characers and less than 80"),

    // //! === === keep in mind
    // check("keepInMind")
    //     .not()
    //     .isEmpty()
    //     .withMessage("images mustn't be empty")
    //     .trim()
    //     .isLength({ min: 5, max: 80 })
    //     .withMessage("title musnt be more than 5 characers and less than 80"),

    // //! === === email
    // check("email")
    //     .not()
    //     .isEmpty()
    //     .withMessage("email mustn't be empty")
    //     .trim()
    //     .isLength({ min: 5, max: 80 })
    //     .withMessage("title musnt be more than 5 characers and less than 80"),

    // //! === === telephone
    // check("telephone")
    //     .not()
    //     .isEmpty()
    //     .withMessage("telephone mustn't be empty")
    //     .trim()
    //     .isLength({ min: 5, max: 80 })
    //     .withMessage("title musnt be more than 5 characers and less than 80"),






    // //? IMAGES

    // //! === === menu item imageUrl
    // check("menu_item_ImageUrl")
    //     .not()
    //     .isEmpty()
    //     .withMessage("images mustn't be empty"),

    // //! === === showcase images imageUrl
    // check("showcase_images")
    //     .not()
    //     .isEmpty()
    //     .withMessage("images mustn't be empty"),

    // //! === === about image imageUrl
    // check("about_image")
    //     .not()
    //     .isEmpty()
    //     .withMessage("images mustn't be empty"),


        
];

// //title
// check("price")
//     .not()
//     .isEmpty()
//     .withMessage('price musnt be empty')
//     .trim()
//     .isInt({ min: 10, max: 99999 })
//     .withMessage('price value is too much and not an number'),

// check("small_description")
//     .not()
//     .isEmpty()
//     .withMessage('small_description musnt be empty')
//     .trim()
//     .isLength({ min: 5, max: 80 })
//     .withMessage('title musnt be more than 5 characers and less than 80'),

// check("long_description__title")
//     .not()
//     .isEmpty()
//     .withMessage('long_description__title musnt be empty')
//     .trim()
//     .isLength({ min: 40, max: 90 })
//     .withMessage('title musnt be more than 40 characers and less than 90'),

// check("long_description__text")
//     .not()
//     .isEmpty()
//     .withMessage('long_description__text musnt be empty')
//     .trim()
//     .isLength({ min: 150, max: 500 })
//     .withMessage('title musnt be more than 5 characers and less than 500'),

// body("card_image")
//     .not()
//     .isEmpty()
//     .withMessage('image musnt be empty')
// //Password
// body("password", "password must be at least 5 characters long")
//     .trim()
//     .isLength({ min: 5, max: 20 }),

//Repeat password
// body("repeatPassword").custom((value, { req }) => {

// })
