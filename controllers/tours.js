const Tours = require("./../models/tours");

exports.getLanding = (req, res, next) => {
    res.render("landing", {
        pageTitle: "travel assistant",
        path: "/"
    });
};

exports.getTours = (req, res, next) => {
    Tours.fetchAll()
        .then(tours => {
            res.render("tours/tours", {
                tours: tours,
                pageTitle: "tours",
                path: "/tours"
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getTour = (req, res, next) => {
    const tourId = req.params.singleTourId;
    Tours.findById(tourId)
        .then(tour => {
            res.render("tours/tour", {
                tour: tour,
                pageTitle: tour.title,
                path: "/tours"
            });
        })
        .catch(err => console.log(err));
};
 
exports.postTours = (req, res, next) => {
    res.render("tours/tours", {
        pageTitle: "tours",
        path: "/tours"
    });
};
