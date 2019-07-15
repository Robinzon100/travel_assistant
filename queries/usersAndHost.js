const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');


class UserAndHostQueries {

    static save(collection, object) {
        const db = getDb();
        return db.collection(collection)
            .insertOne(object)
            .then((docs) => {
                const result = docs;
            }).catch((err) => {
                console.log(err);
            });
    }
}



module.exports = UserAndHostQueries;
//
// ─── SAVE ───────────────────────────────────────────────────────────────────────
//



//
// ─── FIND ───────────────────────────────────────────────────────────────────────
//

// static findById(companyId) {
// const db = getDb();
// return db.collection('companies')
//     .findOne({ _id: new mongodb.ObjectId(companyId) })
//     .then(company => {
//         return company;
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }


// static findCompany(email, password) {
// const db = getDb();
// return db.collection('companies')
//     .findOne({ email: email, password: password })
//     .then(company => {
//         return company;
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }


// static findByEmail(email) {
// const db = getDb();
// return db.collection('companies')
//     .findOne({ email: email })
//     .then(company => {
//         return company;
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }


// static findByToken(token) {
// const db = getDb();
// return db.collection('companies')
//     .findOne({ resetToken: token })
//     .then(company => {
//         return company;
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }


