const Tours = require("./../models/tours");
const Users = require('./../models/users')


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
    // console.log(req.session)
    // console.log(req.session.logedIn)
    Tours.fetchAll()
        .then(tours => {
            res.render("tours/tours", {
                logedIn: req.session.logedIn,
                user: req.session.user,
                tours: tours,
                pageTitle: "tours",
                path: "/explore"
            });
        })
        .catch(err => {
            console.log(err);
        });
};


exports.postTourToBookmark = (req, res, next) => {
    const { addedPost, tourId } = req.body;
    let curentUser = req.session.user._id;

    // if (addedPost) {
        Tours.findById(tourId)
            .then((tour) => {
                Users.findById(curentUser._id)
                    .then((user) => {
                        req.user.addToBookmark(tour);
                        res.redirect('/explore');
                    }).catch((err) => {
                        console.log(err)
                    });
            }).catch((err) => {
                console.log(err)
            });


    // }
};



// ?GET a single tour page
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
                            path: "/explore"
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
                            path: "/explore"
                        });
                    })
                    .catch(err => console.log(err));
            }
        });






};


//
//? ─── SEARCH ─────────────────────────────────────────────────────────────────────
//
exports.getSearch = (req, res, next) => {
    res.render("tours/search", {
        logedIn: req.session.logedIn,
        pageTitle: "search",
        path: "/search"
    });
};




