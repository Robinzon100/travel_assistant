const Tours = require('../models/tours');


exports.getAddTour = (req, res, next) => {
    res.render('admin/add-tour', {
        pageTitle: "add-tour",
        path: "/admin/add-tours"
    });
};


exports.postAddTour = (req, res, next) =>{
    const {title, price, description, image, locations, locationLink, website, telephone, email, ratting, category} = req.body;


    const tour = new Tours(title, price, description, image, locations, locationLink, website, telephone, email, ratting, category);
    

    tour.save()
        .then(tour => {
            res.redirect('/tours');
        })
        .catch(err => {
            console.log(err);
        });
};


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