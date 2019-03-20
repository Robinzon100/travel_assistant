const getDb = require('../utils/database').getDb;
const mongoId = require('mongodb').ObjectID;

class Tours {
    constructor(title, price, description, image, locations, locationLink, website, telephone, email, ratting) {
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
    }


    save() {
        const db = getDb();
        return db.collection('tours')
            .insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll(){
        const db = getDb();
        return db.collection('tours')
        .find()
        .toArray()
        .then(tours =>{
            console.log(result);
            return tours;
        })
        .catch(err =>{
            console.log(err);
        });
    }

}