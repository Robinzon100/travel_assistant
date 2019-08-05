const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');


class UserAndHostQueries {



    //
    // ─── SAVE ───────────────────────────────────────────────────────────────────────
    //
    static save(collection, object) {
        const db = getDb();
        return db.collection(collection)
            .insertOne(object)
            .then((result) => {
                const Result = result;
            }).catch((err) => {
                console.log(err);
            });
    }


    // 
    // ─── FIND ───────────────────────────────────────────────────────────────────────
    //

    static findById(collection, objectId) {
        const db = getDb();
        return db.collection(collection)
            .findOne({ _id: new mongodb.ObjectId(objectId) })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            })
    }



    static findByEmail(collection, email) {
        const db = getDb();
        return db
            .collection(collection)
            .findOne({ email: email })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }


    static findByToken(collection, token) {
        const db = getDb();
        return db
            .collection(collection)
            .findOne({ resetToken: token })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static find(collection, email, password) {
        const db = getDb();
        return db
            .collection(collection)
            .findOne({ email: email, password: password })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findByEmail(collection, email) {
        const db = getDb();
        return db
            .collection(collection)
            .findOne({ email: email })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(collection, Id) {
        const db = getDb();
        return db
            .collection(collection)
            .findOne({ _id: new mongodb.ObjectId(Id) })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }



    //
    // ─── UPDATE ─────────────────────────────────────────────────────────────────────
    //
    static saveAndUpdateToken(collection, email, resetToken) {
        const db = getDb();
        return db
            .collection(collection)
            .updateOne(
                { email: email },
                {
                    $set: {
                        resetToken: resetToken,
                        resetTokenExpiration: new Date() * 3600000
                    }
                }
            )
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static updatePassword(collection, userId, newPassword) {
        const db = getDb();
        return db
            .collection(collection)
            .updateOne(
                { _id: new mongodb.ObjectId(userId) },
                { $set: { password: newPassword, resetToken: null, resetTokenExpiration: null } }
            )
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            });
    }




    //
    // ─── OTHER ─────────────────────────────────────────────────────────────────────
    //
    static addViews(objectId, collection, visitedIp) {
        const db = getDb();
        return db
            .collection(collection)
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



module.exports = UserAndHostQueries;

