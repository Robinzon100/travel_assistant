const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');



class Host {
    constructor(email, password, name, website, telephone, type, comments, posts, created_at, roles) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.website = website;
        this.telephone = telephone;
        this.type = type;
        this.comments = comments;
        this.posts = {
            items: []
        };
        this.created_at = new Date();
        this.role = "company"; 
    }

    //
    // ─── SAVE ───────────────────────────────────────────────────────────────────────
    //
    


    // save() {
    //     const db = getDb();
    //     return db.collection('companies') 
    //         .insertOne(this)
    //         .then((company) => {
    //             console.log(company);
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    // }




    //
    // ─── FIND ───────────────────────────────────────────────────────────────────────
    //

    // static findById(companyId) {
    //     const db = getDb();
    //     return db.collection('companies')
    //         .findOne({ _id: new mongodb.ObjectId(companyId) })
    //         .then(company => {
    //             return company;
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }


    static findCompany(email, password) {
        const db = getDb();
        return db.collection('companies')
            .findOne({ email: email, password: password })
            .then(company => {
                return company;
            })
            .catch(err => {
                console.log(err);
            })
    }


    static findByEmail(email) {
        const db = getDb();
        return db.collection('companies')
            .findOne({ email: email })
            .then(company => {
                return company;
            })
            .catch(err => {
                console.log(err);
            })
    }


    static findByToken(token) {
        const db = getDb();
        return db.collection('companies')
            .findOne({ resetToken: token })
            .then(company => {
                return company;
            })
            .catch(err => {
                console.log(err);
            })
    }



    
}



module.exports = Host;