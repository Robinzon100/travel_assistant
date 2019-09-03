const Tours = require("./../models/tours");
const Users = require("./../models/users");
const queries = require("./../queries/usersAndHost");
const isVisited = require("./../utils/visited").isVisited;

//! ─── LANDING ────────────────────────────────────────────────────────────────────
exports.getLanding = (req, res, next) => {
    res.render("landing", {
        logedIn: req.session.logedIn,
        pageTitle: "travel assistant",
        path: "/"
    });
};

//! ─── TOURS ──────────────────────────────────────────────────────────────────────
exports.getTours = (req, res, next) => {
    queries
        .fetchAll("posts")
        .then(posts => {
            res.render("pages/explore", {
                logedIn: req.session.logedIn,
                user: req.session.user,
                posts: posts,
                pageTitle: "explore",
                path: "/explore"
            });
        })
        .catch(err => {
            console.log(err);
        });

    Tours.fetchAll();
};

exports.postTourToBookmark = (req, res, next) => {
    const { addedPost, tourId } = req.body;
    let curentUser = req.session.user._id;

    Tours.findById(tourId)
        .then(tour => {
            Users.findById(curentUser._id)
                .then(user => {
                    req.user.addToBookmark(tour);
                    res.redirect("/explore");
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

//! GET a single tour page
exports.getPost = (req, res, next) => {
    const postId = req.params.singlePostId;
    const visitorIp = req.socket.localAddress;

    isVisited(postId, visitorIp);

    queries
        .findById("posts", postId)
        .then(post => {
            console.log(post);
            
            res.render(`pages/${post.category}`, {
                logedIn: req.session.logedIn,
                post: post,
                pageTitle: post.title,
                path: "/explore"
            });
        })
        .catch(err => console.log(err));
};

//
//! ─── CAFE ──────────────────────────────────────────────────────────────────────
//
//!  GET a single cafe page
exports.getCafe = (req, res, next) => {
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
};

//
//! ─── SEARCH ─────────────────────────────────────────────────────────────────────
//
exports.getSearch = (req, res, next) => {
    res.render("pages/search", {
        logedIn: req.session.logedIn,
        pageTitle: "search",
        path: "/search"
    });
};

// queries.getPostsVisitorsIp("posts", postId).then(visitedIps => {
//     let isVisited = false;

//     visitedIps.forEach(el => {
//         if (el == visitorIp) {
//             isVisited = true;
//         }
//     });

//     if (isVisited) {
//         queries
//             .findById('posts',postId)
//             .then(post => {
//                 let postCategory = post.category;
//                 res.render(`pages/${post.category}`, {
//                     logedIn: req.session.logedIn,
//                     post: post,
//                     pageTitle: post.title,
//                     path: "/explore"
//                 });
//             })
//             .catch(err => console.log(err));

//     } else {
//         queries
//             .findById('posts',postId)
//             .then(post => {
//                 let postCategory = post.category;
//                 queries.addVisitors(post._id, "posts", visitorIp);

//                 res.render(`pages/${post.category}`, {
//                     logedIn: req.session.logedIn,
//                     post: post,
//                     pageTitle: post.title,
//                     path: "/explore"
//                 });
//             })
//             .catch(err => console.log(err));
//     }
// });
