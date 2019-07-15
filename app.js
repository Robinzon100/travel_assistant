// ─── BASE IMPORTS ───────────────────────────────────────────────────────────────
// const fs = require('fs');
// const http2 = require("http2");
// const cert = fs.readFileSync('my.cert')
// const key = fs.readFileSync('my.key')
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const volleyball = require("volleyball");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require('connect-flash');
const multer = require('multer');
// const compression = require('compression');
require('dotenv').config()  

//! MONGODB URI 
const MONGODB_URI = "mongodb+srv://robinzon:rU0Hbn7IsLgLk4KF@travel-assistant-btaux.mongodb.net/travel-assistant";


//
// ─── MY EXPORTS ─────────────────────────────────────────────────────────────────
//
module.exports = {
    MONGODB_URI
};

// ─── MY IMPORTS ─────────────────────────────────────────────────────────────────
const mongoConnect = require("./utils/database").mongoConnect;
const Users = require('./models/users');
const Companies = require('./models/companies');



// app.use(compression)

// ─── VIEW ENGINE ────────────────────────────────────────────────────────────────
app.set("view engine", "ejs");
app.set("views", "views");

// ─── BODY PARSER AND MULTER ────────────────────────────────────────────────────────────────
app.use(bodyParser.urlencoded({ extended: true }));





// ─── FILE STORAGE OPTIONS FOR MULTER ────────────────────────────────────────────    
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, '(' + new Date().getTime() + ')--' + file.originalname);
    }
})

// const cpUpload = multer.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
const upload = multer({ storage: fileStorage }).fields([
    { name: 'card_image', maxCount: 1 },
    { name: 'showcase_images', maxCount: 6 },
    { name: 'slider_images', maxCount: 20 },
    { name: 'profile_image', maxCount: 1 }
]);

app.use(upload);

// reading public folder
app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, "images")));




const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: "sessions"
});

// USING the session for express
app.use(
    session({
        secret: "this is the secret",
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

// using volleyball
app.use(volleyball);
//using CONNECT FLASH MESSAGE
app.use(flash());




//username, email, password, bookmarks, id, resetToken, resetTokenExpiration

//user and companies middleware
app.use((req, res, next) => {
    if (!req.session.user || !req.session.company) {
        return next();
    }
    Users.findById(req.session.user._id)
        .then((user) => {
            req.user = new Users(user.username, user.email, user.password, user.phone_number, user.bookmarks, user._id, user.resetToken, user.resetTokenExpiration);
            next();
        }).catch((err) => console.log(err));

    // Companies.findById(req.session.company._id)
    //     .then((company) => {
    //         req.company = new Companies(company.name, company.email, company.password, company.website, company.telephone, company.type, company.posts, company.role);
    //         next();
    //     }).catch((err) => console.log(err));



});







// ─── ROUTES ─────────────────────────────────────────────────────────────────────
const toursRouts = require("./routes/tours");
const adminsRouts = require("./routes/admin");

const registrationRoutes = require("./routes/auth");

// ─── USING THE ROUTES ───────────────────────────────────────────────────────────
app.use("/admin", adminsRouts);
app.use(toursRouts);
app.use(registrationRoutes);

app.use((req, res, next) => {
    res.status(404).send("404 - Not Found!");
});

// const server = http2.createSecureServer({cert, key});

// server.listen(8443);

mongoConnect(() => {
    // console.log(client);
    console.log("connected !");
    app.listen(3000);
});
