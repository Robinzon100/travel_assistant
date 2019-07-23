const getDb = require("../utils/database").getDb;
const mongodb = require("mongodb");

class Host {
    constructor(
        email,
        password,
        name,
        website,
        telephone,
        type,
        isACompany,
        bio,
        posts,
        reviews,
        comments,
        created_at,
        verified,
        trusted,
        resetToken,
        resetTokenExpiration,
        roles,
        id
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.website = website;
        this.telephone = telephone;
        this.type = type;
        this.isACompany = isACompany;
        this.bio = bio;
        this.posts = {
            posts: []
        };
        this.reviews = {
            satisfaction: [],
            Cleanliness: [],
            communication: [],
            check_in: [],
            value: []
        };
        this.comments = [];
        this.created_at = new Date();
        this.verified = false;
        this.trusted = false;
        this.resetToken = resetToken;
        this.resetTokenExpiration = resetTokenExpiration;
        this.roles = "host";
        this._id = id;
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
        return db
            .collection("companies")
            .findOne({
                email: email,
                password: password
            })
            .then(company => {
                return company;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findByEmail(email) {
        const db = getDb();
        return db
            .collection("companies")
            .findOne({
                email: email
            })
            .then(company => {
                return company;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findByToken(token) {
        const db = getDb();
        return db
            .collection("companies")
            .findOne({
                resetToken: token
            })
            .then(company => {
                return company;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Host;
