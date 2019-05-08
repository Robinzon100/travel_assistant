const getDb = require("../utils/database").getDb;
const mongoId = require("mongodb").ObjectID;
const mongodb = require("mongodb");

class Tours {
    constructor(
        title,
        price,
        description,
        image,
        locations,
        locationLink,
        website,
        telephone,
        email,
        ratting,
        category
    ) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.image = image;
        this.locations = locations;
        this.locationLink = locationLink;
        this.website = website;
        this.telephone = telephone;
        this.email = email;
        this.ratting = ratting;
        this.category = category;
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
                console.log(tour);
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
            .find({ _id: new mongodb.ObjectId(tourId) })
            .next()
            .then(tour => {
                console.log(tour);
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
}

module.exports = Tours;
