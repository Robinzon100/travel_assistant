const getDb = require("../utils/database").getDb;
const mongoId = require("mongodb").ObjectID;
const mongodb = require("mongodb");

class Tours {
    constructor(
        title,
        price,
        small_description,
        long_description__title,
        long_description__text,
        includes,
        location,
        locationLink,
        website,
        email,
        telephone,
        type,
        difficulty,
        cardImageUrl,
        showcaseImagesUrls,
        sliderImagesUrls
    ) {
        this.title = title;
        this.price = price;
        this.date_created = Date();
        this.small_description = small_description;
        this.long_description__title = long_description__title;
        this.long_description__text = long_description__text;
        this.includes = includes;
        this.location = location;
        this.locationLink = locationLink;
        this.website = website;
        this.email = email;
        this.telephone = telephone;
        this.reviews = {
            satisfaction: [2],
            safety: [2],
            communication: [2],
            experience: [2],
            value: [2],
            accuracy: [2]
        };
        this.type = type;
        this.difficulty = difficulty;
        this.views = 1;
        this.visitors = [];
        this.cardImageUrl = cardImageUrl;
        this.showcaseImagesUrls = showcaseImagesUrls;
        this.sliderImagesUrls = sliderImagesUrls;
        this.category = 'tour';
    }

    //!  SAVING SINGLE tour
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

    //!  getting SINGLE tour
    static findById(tourId) {
        const db = getDb();
        return db
            .collection("tours")
            .find({ _id: new mongodb.ObjectId(tourId) })
            .next()
            .then(tour => {
                // console.log(tour);
                return tour;
            })
            .catch(err => console.log(err));
    }

    //!  getting ALL tour
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

    //!  ADDING TO THE VIEWS
    static isVisited(tourId) {
        const db = getDb();
        return db
            .collection("tours")
            .findOne({ _id: new mongodb.ObjectId(tourId) })
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
                { _id: new mongodb.ObjectId(tourId) },
                { $inc: { views: 1 }, $push: { visitors: visitedIp } }
            )
            .then(tour => {
                return tour;
            })
            .catch(err => console.log(err));
    }
}

module.exports = Tours;
