const getDb = require("../utils/database").getDb;
const mongodb = require("mongodb");

//username, email, phone_number, bookmarks, hashedPassword
class User {
    constructor(
        username,
        email,
        password,
        phone_number,
        bookmarks,
        id,
        resetToken,
        resetTokenExpiration,
        role
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
        this.bookmarks = bookmarks;
        this.date = Date();
        this._id = id;
        this.resetToken = resetToken;
        this.resetTokenExpiration = resetTokenExpiration;
        this.role = "user";
    }

    //
    // ─── SAVE ───────────────────────────────────────────────────────────────────────
    //
    save() {
        const db = getDb();
        return db
            .collection("users")
            .insertOne(this)
            .then(user => {
                let resultUser = user;
            })
            .catch(err => console.log(err));
    }

    addToBookmark(receavedPost) {
        const receavedId = receavedPost._id;
        const existingItems = this.bookmarks.items;

        // console.log(receavedId)
        // console.log(this.bookmarks.items)

        let exists = false;

        for (let i = 0; i < existingItems.length; i++) {
            if (existingItems[i].postId.toString() === receavedId.toString()) {
                exists = true;
                break;
            } else {
                exists = false;
            }
        }

        if (exists) {
            console.log("exists or not : " + exists);
            return;
        } else {
            console.log("xeiiiiiiiii");
            console.log("exists or not : " + exists);

            // pushing the postId
            existingItems.push({
                postId: new mongodb.ObjectId(receavedId)
            });

            // boockmarks object
            const updatedbookmarks = {
                items: existingItems
            };

            const db = getDb();
            return db
                .collection("users")
                .updateOne(
                    { _id: new mongodb.ObjectId(this._id) },
                    { $set: { bookmarks: updatedbookmarks } }
                );
        }

        // console.log(updatedbookmarksItems);

        console.log(this._id);
    }

    //
    // ─── FIND ───────────────────────────────────────────────────────────────────────
    //
    static findUserByToken(token) {
        const db = getDb();
        return db
            .collection("users")
            .findOne({ resetToken: token })
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findUser(email, password) {
        const db = getDb();
        return db
            .collection("users")
            .findOne({ email: email, password: password })
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findByEmail(email) {
        const db = getDb();
        return db
            .collection("users")
            .findOne({ email: email })
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(userId) {
        const db = getDb();
        return db
            .collection("users")
            .findOne({ _id: new mongodb.ObjectId(userId) })
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            });
    }

    //
    // ─── UPDATE ─────────────────────────────────────────────────────────────────────
    //
    static saveAndUpdateUserToken(email, resetToken) {
        const db = getDb();
        return db
            .collection("users")
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

    static updateUserPassword(userId, newPassword) {
        const db = getDb();
        return db
            .collection("users")
            .updateOne(
                { _id: new mongodb.ObjectId(userId) },
                { $set: { password: newPassword, resetToken: null } }
            )
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = User;
