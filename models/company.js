const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');



class Company {
    constructor(email, password, name, website, telephone, type, posts, created_at, roles) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.website = website;
        this.telephone = telephone;
        this.type = type;
        this.posts = posts;
        this.created_at = new Date();
        this.roles = "company";
    }


    save() {
        const db = getDb();
        return db.collection('companies')
            .insertOne(this)
            .then((company) => {
                console.log(company);
            }).catch((err) => {
                console.log(err);
            });
    }
}



module.exports = company;