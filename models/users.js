const getDb = require('../utils/database').getDb;


class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
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
            .find({ username: { username }, password: { password } })
            .then(user => {
                console.log(user);
            })
            .catch(err => {
                console.log(err);
            })
    }
}


module.exports = User;