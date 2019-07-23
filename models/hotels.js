const getDb = require("../utils/database").getDb;
const mongoId = require("mongodb").ObjectID;
const mongodb = require("mongodb");

class HotelApartment {
    constructor(
        title,
        small_description,
        long_description__title,
        long_description__text,
        ammenities,
        types_of_rooms,
        rules,
        keepInMind,
        location,
        locationLink,
        website,
        email,
        telephone,
        views,
        visitors,
        cardImageUrl,
        showcaseImagesUrls,
        sliderImagesUrls,
        date_created,
        ratting,
        comments,
        fitured,
        highlyRated,
        hostId
    ) {
        this.title = title;
        this.small_description = small_description;
        this.long_description__title = long_description__title;
        this.long_description__text = long_description__text;
        this.ammenities = [];
        this.types_of_rooms = [
            {
                price_per_night: null,
                beds: [
                    {
                        amount: null,
                        types: null
                    }
                ],
                numberOfRooms: null,
                ammenities: null
            }
        ];
        this.rules = [];
        this.keepInMind = [];
        this.location = location;
        this.locationLink = locationLink;
        this.website = website;
        this.email = email;
        this.telephone = telephone;
        this.views = views;
        this.visitors = visitors;
        this.cardImageUrl = cardImageUrl;
        this.showcaseImagesUrls = showcaseImagesUrls;
        this.sliderImagesUrls = sliderImagesUrls;
        this.date_created = Date();
        this.ratting = {
            satisfaction: [],
            accuracy: [],
            communication: [],
            check_in: [],
            value: []
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
        this.fitured = fitured;
        this.highlyRated = highlyRated;
        this.hostId = hostId;
        this.sliderImagesUrls = sliderImagesUrls;
    }

    // === === === === ===
    //!  SAVING SINGLE tour
    // === === === === ===

    save() {
        const db = getDb();
        return db
            .collection("tours")
            .insertOne(this)
            .then(tour => {
                let savedtour = tour;
                // console.log(tour);
            })
            .catch(err => {
                console.log(err);
            });
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

module.exports = Tours;
