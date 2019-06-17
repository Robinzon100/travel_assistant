const Tours = require('../models/tours');
const { validationResult } = require("express-validator/check");



exports.getAddTour = (req, res, next) => {
    res.render('admin/add-tour', {
        pageTitle: "add-tour",
        path: "/admin/add-tours",
        logedIn: req.session.logedIn,
        errorMessage: req.flash("error")
    });
};


exports.postAddTour = (req, res, next) => {
    const { title, price, small_description, long_description__title, long_description__text, includes, location, locationLink, website, email, telephone, ratting, category, views } = req.body;
    let viewsInt = parseInt(views);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const allImages = req.files;
        const cardImageUrl = allImages.card_image[0].path; // CARD IMAGE URL

        const showcaseImages = allImages.showcase_images;
        const showcaseImagesUrls = [] // SHOWCASE IMAGE URLS
        showcaseImages.forEach(image => showcaseImagesUrls.push(image.path));


        const sliderImages = allImages.slider_images;
        const sliderImagesUrls = [] // SLIDER IMAGE URLS
        sliderImages.forEach(image => sliderImagesUrls.push(image.path));

        //visitors array
        let visitors = [];

        const tour = new Tours(title, price, small_description, long_description__title, long_description__text, includes, location, locationLink, website, email, telephone, ratting, category, viewsInt, visitors, cardImageUrl, showcaseImagesUrls, sliderImagesUrls);


        tour.save()
            .then(tour => {
                res.redirect('/tours');
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        // console.log(errors.array());
        return res.status(422).render('admin/add-tour', {
            pageTitle: "add-tour",
            path: "/admin/add-tours",
            logedIn: req.session.logedIn,
            errorMessage: errors.array()
        });
    }
}


 


// exports.postAddTours = (req, res, next) =>{
//     const title = req.body.title;
//     const price = req.body.price;
//     const description = req.body.description;
//     const image = req.body.image;
//     const locations = req.body.locations;
//     const locationLink = req.body.locationLink;
//     const website = req.body.website;
//     const telephone = req.body.telephone;
//     const email = req.body.email;
//     const ratting = req.body.ratting;

//     const tour = new Tours(title, price, description, image, locations, locationLink, website, telephone, email, ratting);

//     tour.save()
//         .then(tours => {
//             console.log(tours);
//         })
//         .catch(err => {
//             console.log(err);
//         });


// };