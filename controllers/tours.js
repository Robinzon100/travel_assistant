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
    console.log(req.Host)
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
//? ─── CAFE ──────────────────────────────────────────────────────────────────────
//
//?  GET a single cafe page
exports.getCafe = (req, res, next) =>{
    let allAmenities = [
        {
            name: "Free Wireless Internet",
            have: false
        },
        {
            name: "Free Parking",
            have: false
        },
        {
            name: "Housekeeping",
            have: false
        },
        {
            name: "Towels",
            have: false
        },
        {
            name: "Complimentary Toiletries",
            have: false
        },
        {
            name: "Complimentary Breakfast",
            have: false
        },
        {
            name: "rosemary-hallett added Good Showers",
            have: false
        },
        {
            name: "Television Set",
            have: false
        },
        {
            name: "Refrigerator",
            have: false
        },
        {
            name: "Free Early Check-in",
            have: false
        },
        {
            name: "Luxury Bedding",
            have: false
        },
        {
            name: "Cable TV",
            have: false
        },
        {
            name: "Swimming Pool",
            have: false
        },
        {
            name: "Room Service",
            have: false
        },
        {
            name: "Complimentary Bottled Water",
            have: false
        },
        {
            name: "Free Coffee",
            have: false
        },
        {
            name: "On-site Restaurant",
            have: false
        },
        {
            name: "Hair Dryer",
            have: false
        },
        {
            name: "Vending Machines",
            have: false
        },
        {
            name: "Microwave",
            have: false
        },
        {
            name: "Coffeemaker",
            have: false
        },
        {
            name: "Indoor Swimming Pool",
            have: false
        },
        {
            name: "Shuttle Service",
            have: false
        },
        {
            name: "SNACKS",
            have: false
        },
        {
            name: "Satellite TV",
            have: false
        },
        {
            name: "Fitness Center",
            have: false
        },
        {
            name: "Satellite Internet access",
            have: false
        },
        {
            name: "View",
            have: false
        },
        {
            name: "psychicmoon added",
            have: false
        },
        {
            name: "Air Conditioning",
            have: false
        },
        {
            name: "Concierge",
            have: false
        },
        {
            name: "Spa",
            have: false
        },
        {
            name: "Hot Tub",
            have: false
        }
    ];

}


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




