const Tours = require("../models/tours");
const { validationResult } = require("express-validator/check");





//
//? ─── ADD ────────────────────────────────────────────────────────────────────────
//

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
     
    console.log(req.body.open_date);
    res.redirect('/admin/add-cafe');
};





