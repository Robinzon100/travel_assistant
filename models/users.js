const getDb = require('../utils/database').getDb;


class User {
    constructor(username, email, password, bookmarks, id) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.bookmarks = bookmarks;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('user')
            .insertOne(this)
            .then(user => {
                let resultUser = user;
            })
            .catch(err => console.log(err));
    }


    static findUser(email, password) {
        const db = getDb();
        return db.collection('user')
            .find({ email: { email }, password: { password } })
            .then(user => {
                console.log(user);
                return user;
            })
            .catch(err => {
                console.log(err);
            })
    }
}


module.exports = User;