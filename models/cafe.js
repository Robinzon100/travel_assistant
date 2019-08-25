// const getDb = require("../utils/database").getDb;
// const mongoId = require("mongodb").ObjectID;
// const mongodb = require("mongodb");

class Cafe {
    constructor(
        title,
        small_description,
        establishment_name,
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
        hostId
    ) {
        this.title = title;
        this.establishment_name = establishment_name;
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
        this.views = 1;
        this.visitors = [];
        this.date_created = Date();
        this.reviews = {
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
        this.category = 'cafe'
        this.hostId = hostId;
    }
}

module.exports = Cafe;
