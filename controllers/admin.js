const Cafe = require("../models/cafe");
const Tour = require("../models/tours");
const { validationResult } = require("express-validator/check");
const queries = require("../queries/usersAndHost");


//? ─── ADD ────────────────────────────────────────────────────────────────────────

//!  tour
exports.getAddTour = (req, res, next) => {
    res.render("admin/add-tour", {
        pageTitle: "add-tour",
        path: "/admin/add-tours",
        logedIn: req.session.logedIn,
        errorMessage: req.flash("error"),
        oldInputValues: {
            title: "",
            price: "",
            small_description: "",
            long_description__title: "",
            long_description__text: "",
            includes: "",
            location: "",
            locationLink: "",
            website: "",
            email: "",
            telephone: "",
            ratting: "",
            category: "",
            viewsInt: ""
        }
    });
};

exports.postAddTour = (req, res, next) => {
    const {
        title,
        price,
        small_description,
        long_description__title,
        long_description__text,
        includes,
        location,
        locationLink,
        website,
        email,
        telephone,
        type,
        difficulty
    } = req.body;

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        //! === === === === IMAGE PATHS === === === ===
        const allImages = req.files;
        const cardImageUrl = allImages.card_image[0].filename; // CARD IMAGE URL

        const showcaseImages = allImages.showcase_images;
        const showcaseImagesUrls = []; // SHOWCASE IMAGE URLS
        showcaseImages.forEach(image =>
            showcaseImagesUrls.push(image.filename)
        );

        const sliderImages = allImages.slider_images;
        const sliderImagesUrls = []; // SLIDER IMAGE URLS
        sliderImages.forEach(image => sliderImagesUrls.push(image.filename));

        //! === === === === LOCATION LINK === === === ===
        let parsedLocationLink;
        parsedLocationLink = locationLink
            .split(" ")[1]
            .slice(4)
            .replace(/['"]+/g, "");

        const tour = new Tour(
            title,
            price,
            small_description,
            long_description__title,
            long_description__text,
            includes,
            location,
            parsedLocationLink,
            website,
            email,
            telephone,
            type,
            difficulty,
            cardImageUrl,
            showcaseImagesUrls,
            sliderImagesUrls
        );

        queries.save("posts", tour).then(post => {
            res.redirect("/explore");
        });

        //  res.redirect('admin/add-tour');
        // tour.save()
        //     .then(tour => {
        // res.redirect("/explore");
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    } else {
        return res.status(422).render("admin/add-tour", {
            pageTitle: "add-tour",
            path: "/admin/add-tours",
            logedIn: req.session.logedIn,
            errorMessage: errors.array(),
            oldInputValues: {
                title: title,
                price: price,
                small_description: small_description,
                long_description__title: long_description__title,
                long_description__text: long_description__text,
                includes: includes,
                location: location,
                locationLink: locationLink,
                website: website,
                email: email,
                telephone: telephone,
                category: category,
                viewsInt: viewsInt
            }
        });
    }
};

//!  cafe
exports.getAddCafe = (req, res, next) => {
    res.render("admin/add-cafe", {
        pageTitle: "add-cafe",
        path: "/admin/add-cafe",
        logedIn: req.session.logedIn,
        errorMessage: req.flash("error"),
        oldInputValues: {
            title: "",
            price: "",
            small_description: "",
            long_description__title: "",
            long_description__text: "",
            includes: "",
            location: "",
            locationLink: "",
            website: "",
            email: "",
            telephone: "",
            ratting: "",
            category: "",
            viewsInt: ""
        }
    });
};

exports.postAddCafe = (req, res, next) => {
    let {
        title,
        small_description,
        establishment_name,
        long_description__title,
        long_description__text,
        open_time,
        close_time,
        menu_item_name,
        menu_item_description,
        rules,
        keepInMind,
        location,
        locationLink,
        website,
        email,
        telephone
    } = req.body;


    routerCall = 0;
    
    return res.status(422).render("admin/add-cafe", {
                pageTitle: "add-cafe",
                path: "/admin/add-cafe",
                logedIn: req.session.logedIn,
                errorMessage: [],
                oldInputValues: {
                    title: title,
                    small_description: small_description,
                    establishment_name: establishment_name,
                    long_description__title: long_description__title,
                    long_description__text: long_description__text,
                    location: location,
                    locationLink: locationLink,
                    website: website,
                    email: email,
                    telephone: telephone
                }
            });



    // const errors = validationResult(req);



    // if (errors.isEmpty()) {
    //     // //! === === === === MENU === === === ===

    //     const allImages = req.files;

    //     const cardImageUrl = allImages.card_image[0].filename; // CARD IMAGE URL
    //     const aboutImage = allImages.about_image[0].filename; // CARD IMAGE URL

    //     const showcaseImages = allImages.showcase_images;
    //     const showcaseImagesUrls = []; // SHOWCASE IMAGE URLS
    //     showcaseImages.forEach(image =>
    //         showcaseImagesUrls.push(image.filename)
    //     );

    //     const menu_item_ImageUrl = allImages.menu_item_ImageUrl;
    //     const menu_item_ImageUrls = []; // MENU ITEM IMAGE URLS
    //     menu_item_ImageUrl.forEach(image =>
    //         menu_item_ImageUrls.push(image.filename)
    //     );

    //     let menu = [];

    //     for (let i = 0; i < menu_item_ImageUrls.length; i++) {
    //         menu.push({
    //             imageUrl: menu_item_ImageUrls[i],
    //             name: menu_item_name[i],
    //             description: menu_item_description[i],
    //             reviews: []
    //         });
    //     }

    //     //! === === === === TIME OF OPENING === === === ===
    //     let timeOfOpenAndClose = {
    //         opened: open_time,
    //         closed: close_time
    //     };

    //     //! === === === === LOCATION LINK === === === ===
    //     let parsedLocationLink;

    //     parsedLocationLink = locationLink
    //         .split(" ")[1]
    //         .slice(4)
    //         .replace(/['"]+/g, "");

    //     const cafe = new Cafe(
    //         title,
    //         small_description,
    //         establishment_name,
    //         timeOfOpenAndClose,
    //         long_description__title,
    //         long_description__text,
    //         menu,
    //         rules,
    //         keepInMind,
    //         location,
    //         locationLink,
    //         website,
    //         email,
    //         telephone,
    //         cardImageUrl,
    //         showcaseImagesUrls,
    //         aboutImage
    //     );

    //     queries.save("posts", cafe).then(() => {
    //         res.redirect("/explore");
    //     });
 
 

    //     let visitors = [];

    //     // amenities.forEach(amenitie => {
    //     //     activeAmenities.push({
    //     //         amenitie: amenitie,
    //     //         imageUrl: `${amenitie}.svg`,
    //     //         have: true
    //     //     });
    //     // });

    //     // console.log(activeAmenities);
    // } else {
    //     console.log(errors.array())
    //     return res.status(422).render("admin/add-cafe", {
    //         pageTitle: "add-cafe",
    //         path: "/admin/add-cafe",
    //         logedIn: req.session.logedIn,
    //         errorMessage: errors.array(),
    //         oldInputValues: {
    //             title: title,
    //             small_description: small_description,
    //             long_description__title: long_description__title,
    //             long_description__text: long_description__text,
    //             location: location,
    //             locationLink: locationLink,
    //             website: website,
    //             email: email,
    //             telephone: telephone
    //         }
    //     });
    // }
};

//!  shop
exports.getAddShop = (req, res, next) => {
    res.render("admin/add-shop", {
        pageTitle: "add-shop",
        path: "/admin/add-shop",
        logedIn: req.session.logedIn,
        errorMessage: req.flash("error"),
        oldInputValues: {
            title: "",
            price: "",
            small_description: "",
            long_description__title: "",
            long_description__text: "",
            includes: "",
            location: "",
            locationLink: "",
            website: "",
            email: "",
            telephone: "",
            ratting: "",
            category: "",
            viewsInt: ""
        }
    });
};

exports.postAddShop = (req, res, next) => {
    const {
        title,
        small_description,
        long_description__title,
        long_description__text,
        includes,
        location,
        locationLink,
        website,
        email,
        telephone,
        ratting,
        category,
        views
    } = req.body;

    let viewsInt = parseInt(views);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const allImages = req.files;
        const cardImageUrl = allImages.card_image[0].filename; // CARD IMAGE URL

        const showcaseImages = allImages.showcase_images;
        const showcaseImagesUrls = []; // SHOWCASE IMAGE URLS
        showcaseImages.forEach(image =>
            showcaseImagesUrls.push(image.filename)
        );

        const sliderImages = allImages.slider_images;
        const sliderImagesUrls = []; // SLIDER IMAGE URLS
        sliderImages.forEach(image => sliderImagesUrls.push(image.filename));

        //visitors array
        let visitors = [];

        // console.log(cardImageUrl,
        //     showcaseImagesUrls,
        //     sliderImagesUrls)

        const tour = new Tours(
            title,
            small_description,
            long_description__title,
            long_description__text,
            includes,
            location,
            locationLink,
            website,
            email,
            telephone,
            ratting,
            category,
            viewsInt,
            visitors,
            cardImageUrl,
            showcaseImagesUrls,
            sliderImagesUrls
        );

        //  res.redirect('admin/add-tour');
        tour.save()
            .then(tour => {
                res.redirect("/explore");
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        // console.log(errors.array());
        return res.status(422).render("admin/add-tour", {
            pageTitle: "add-tour",
            path: "/admin/add-tours",
            logedIn: req.session.logedIn,
            errorMessage: errors.array(),
            oldInputValues: {
                title: title,
                price: price,
                small_description: small_description,
                long_description__title: long_description__title,
                long_description__text: long_description__text,
                includes: includes,
                location: location,
                locationLink: locationLink,
                website: website,
                email: email,
                telephone: telephone,
                ratting: ratting,
                category: category,
                viewsInt: viewsInt
            }
        });
    }
};
