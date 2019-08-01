const getDb = require("../utils/database").getDb;
const mongoId = require("mongodb").ObjectID;
const mongodb = require("mongodb");

class Cafe {
    constructor(
        title,
        small_description,
        timeOfOpenAndClose,
        long_description__title,
        long_description__text,
        menu,
        rules,
        keepInMind,
        location,
        locationLink,
        website,
        email,
        telephone,
        cardImageUrl,
        showcaseImagesUrls,
        aboutImage,
        views,
        hostId
    ) {
        this.title = title;
        this.small_description = small_description;
        this.timeOfOpenAndClose = timeOfOpenAndClose,
        this.long_description__title = long_description__title;
        this.long_description__text = long_description__text;
        this.menu = menu;
        this.rules = rules;
        this.keepInMind = keepInMind;
        this.location = location;
        this.locationLink = locationLink;
        this.website = website;
        this.email = email;
        this.telephone = telephone;
        this.cardImageUrl = cardImageUrl;
        this.showcaseImagesUrls = showcaseImagesUrls;
        this.aboutImage = aboutImage;
        this.views = views;
        this.visitors = [];
        this.date_created = Date();
        this.ratting = {
            satisfaction: [2], 
            Cleanliness: [2],
            communication: [2],
            food: [2],
            value: [2]
        };
        this.comments = [
            // {
            //     commentId: mongoId.ObjectID(),
            //     userId: null,
            //     date: null,
            //     text: "",
            //     review: {
            //         satisfaction: 0,
            //         accuracy: 0,
            //         communication: 0,
            //         check_in: 0,
            //         value: 0
            //     }
            // }
        ];
        this.fitured = false;
        this.highlyRated = false;
        this.hostId = hostId;
    }

    

    // === === === === ===
    //!  getting SINGLE tour
    // === === === === ===

    static findById(tourId) {
        const db = getDb();
        return db
            .collection("tours")
            .find({
                _id: new mongodb.ObjectId(tourId)
            })
            .next()
            .then(tour => {
                // console.log(tour);
                return tour;
            })
            .catch(err => console.log(err));
    }

    // === === === === ===
    //!  getting ALL tour
    // === === === === ===

    static fetchAll() {
        const db = getDb();
        return db
            .collection("tours")
            .find()
            .toArray()
            .then(tours => {
                return tours;
            })
            .catch(err => {
                console.log(err);
            });
    }

    // === === === === ===
    //!  ADDING TO THE VIEWS
    // === === === === ===
    static isVisited(tourId) {
        const db = getDb();
        return db
            .collection("tours")
            .findOne({
                _id: new mongodb.ObjectId(tourId)
            })
            .then(tour => {
                return tour.visitors;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static addViews(tourId, visitedIp) {
        const db = getDb();
        return db
            .collection("tours")
            .findOneAndUpdate(
                {
                    _id: new mongodb.ObjectId(tourId)
                },
                {
                    $inc: {
                        views: 1
                    },
                    $push: {
                        visitors: visitedIp
                    }
                }
            )
            .then(tour => {
                return tour;
            })
            .catch(err => console.log(err));
    }
}

module.exports = Cafe;
