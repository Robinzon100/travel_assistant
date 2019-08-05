const getDb = require("../utils/database").getDb;
const mongoId = require("mongodb").ObjectID;
const mongodb = require("mongodb");

class Shop {
    constructor(
        title,
        small_description,
        long_description__title,
        long_description__text,
        whatYouCanBuy,
        location,
        locationLink,
        website,
        email,
        telephone,
        ratting,
        category,
        views,
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
        this.whatYouCanBuy = whatYouCanBuy;
        this.location = location;
        this.locationLink = locationLink;
        this.website = website;
        this.email = email;
        this.telephone = telephone;
        this.ratting = ratting;
        this.category = category;
        this.views = views;
        this.visitors = [];
        this.cardImageUrl = cardImageUrl;
        this.showcaseImagesUrls = showcaseImagesUrls;
        this.sliderImagesUrls = sliderImagesUrls;
    }

 
}

module.exports = Shop;
