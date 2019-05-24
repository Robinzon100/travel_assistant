const Tours = require("./../models/tours");


//
//? ─── LANDING ────────────────────────────────────────────────────────────────────
//
exports.getLanding = (req, res, next) => {
    res.render("landing", {
        logedIn: req.session.logedIn, 
        pageTitle: "travel assistant",
        path: "/" 
    });
};


//
//? ─── TOURS ──────────────────────────────────────────────────────────────────────
//
exports.getTours = (req, res, next) => {
    console.log(req.session.logedIn)
    Tours.fetchAll()
        .then(tours => {
            res.render("tours/tours", {
                logedIn: req.session.logedIn,
                tours: tours,
                pageTitle: "tours",
                path: "/tours"
            });
        })
        .catch(err => {
            console.log(err);
        });
};



//=== === === === === 
//! GET a single tour page
//=== === === === === 
exports.getTour = (req, res, next) => {
    const tourId = req.params.singleTourId;
    Tours.findById(tourId)
        .then(tour => {
            res.render("tours/tour", {
                logedIn: req.session.logedIn,
                tour: tour,
                pageTitle: tour.title,
                path: "/tours"
            });
        })
        .catch(err => console.log(err));
};



//=== === === === === 
//! POST a single tour page
//=== === === === === 
exports.postTours = (req, res, next) => {
    res.render("tours/tours", {
        logedIn: req.session.logedIn,
        pageTitle: "tours",
        path: "/tours"
    });
};
