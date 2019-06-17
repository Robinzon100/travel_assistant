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
// ?GET a single tour page
//=== === === === === 
exports.getTour = (req, res, next) => {
    // console.log(req.connection.remoteAddress);
    // var ipuser = JSON.parse(body) 
    const tourId = req.params.singleTourId;
    const visitorIp = req.socket.localAddress;

    Tours.isVisited(tourId)
        .then(visitedIps => {
            console.log(visitedIps);

            let isVisited = false;

            visitedIps.forEach(el => {
                if (el == visitorIp) {
                    isVisited = true;
                }
            });

            if (isVisited) {
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

            } else {
                Tours.findById(tourId)
                    .then(tour => {
                        Tours.addViews(tourId, visitorIp);

                        res.render("tours/tour", {
                            logedIn: req.session.logedIn,
                            tour: tour,
                            pageTitle: tour.title,
                            path: "/tours"
                        });
                    })
                    .catch(err => console.log(err));
            }
        });






};



//=== === === === === 
//? POST a single tour page
//=== === === === === 
exports.getSearch = (req, res, next) => {
    res.render("tours/search", {
        logedIn: req.session.logedIn,
        pageTitle: "search",
        path: "/search"
    });
};




