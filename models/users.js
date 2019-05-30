const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');


class User {
    constructor(username, email, password, bookmarks, id, resetToken, resetTokenExpiration) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.date = Date();
        this.bookmarks = bookmarks;
        this._id = id;
        this.resetToken = resetToken;
        this.resetTokenExpiration = resetTokenExpiration;
    }

    //
    // ─── SAVE ───────────────────────────────────────────────────────────────────────
    //
    save() {
        const db = getDb();
        return db.collection('user')
            .insertOne(this)
            .then(user => {
                let resultUser = user;
            })
            .catch(err => console.log(err));
    }


    //
    // ─── FIND ───────────────────────────────────────────────────────────────────────
    //
    static findUserByToken(token) {
        const db = getDb();
        return db.collection('user')
            .findOne({resetToken: token})
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            })
    }
    

    static findUser(email, password) {
        const db = getDb();
        return db.collection('user')
            .findOne({ email: email, password:  password  })
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            })
    }


    static findByEmail(email) {
        const db = getDb();
        return db.collection('user')
            .findOne({ email: email})
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('user')
            .findOne({ _id: new mongodb.ObjectId(userId)})
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            })
    }





    //
    // ─── UPDATE ─────────────────────────────────────────────────────────────────────
    //
    static saveAndUpdateUserToken(email, resetToken) {
        const db = getDb();
        return db.collection('user')
            .updateOne(
                { email: email },
                { $set: {resetToken:  resetToken, resetTokenExpiration: new Date() * 3600000} }
            )
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            })
    }



    static updateUserPassword(userId, newPassword) {
        const db = getDb();
        return db.collection('user')
            .updateOne(
                { _id: new mongodb.ObjectId(userId)},
                { $set: {password:  newPassword} }
            )
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            })
    }
}


module.exports = User;



