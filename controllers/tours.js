const Tours = require('./../models/tours');


exports.getLanding = (req, res, next) => {
    res.render('landing', {
        pageTitle: "travel assistant",
        path: '/'
    });
};



exports.getTours = (req, res, next) => {
    Tours.fetchAll()
        .then(tours => {
            res.render('tours/tours', {
                tours: tours,
                pageTitle: "tours",
                path: '/tours'
            })
        });

};

exports.postTours = (req, res, next) => {
    res.render('tours/tours', {
        pageTitle: "tours",
        path: '/tours'
    });
};