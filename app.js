// ─── BASE IMPORTS ───────────────────────────────────────────────────────────────
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const volleyball = require("volleyball");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const multer = require("multer");
// const compression = require('compression'); 
require("dotenv").config();

// ─── MY IMPORTS ─────────────────────────────────────────────────────────────────
const mongoConnect = require("./utils/database").mongoConnect;

//models
const Users = require("./models/users");
const Host = require("./models/host");

//querys
const userAndHostQuery = require("./queries/usersAndHost.js");

// app.use(compression)

// ─── VIEW ENGINE ────────────────────────────────────────────────────────────────
app.set("view engine", "ejs");
app.set("views", "views");

// ─── BODY PARSER AND MULTER ────────────────────────────────────────────────────────────────
app.use(bodyParser.urlencoded({ extended: true }));

// ─── FILE STORAGE OPTIONS FOR MULTER ────────────────────────────────────────────
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, "(" + new Date().getTime() + ")--" + file.originalname);
    }
});

// const cpUpload = multer.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
const upload = multer({ storage: fileStorage }).fields([
    { name: 'menu_item_ImageUrl', maxCount: 8 },
    { name: 'card_image', maxCount: 1 },
    { name: 'showcase_images', maxCount: 6 },
    { name: 'about_image', maxCount: 1 },
    { name: 'slider_images', maxCount: 20 },
    { name: 'profile_image', maxCount: 1 }
]);

app.use(upload);

// reading public folder
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

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
    if (req.session.user == undefined) {
        if (req.session.host == undefined) {
            return next();
        } else {
            userAndHostQuery
                .findById("hosts", req.session.host._id)
                .then(host => {
                    //host is with bit "H" becouse req.host is a hostname command
                    req.Host = new Host(
                        host.email,
                        host.password,
                        host.name,
                        host.website,
                        host.telephone,
                        host.type,
                        host.isACompany,
                        host.bio,
                        host.posts,
                        host.reviews,
                        host.comments,
                        host.created_at,
                        host.verified,
                        host.trusted,
                        host.resetToken,
                        host.resetTokenExpiration,
                        host.roles,
                        host._id
                    );
                    next();
                })
                .catch(err => console.log(err));
        }
    } else {
        userAndHostQuery
            .findById("users", req.session.user._id)
            .then(recevedUser => {
                req.user = new Users(
                    recevedUser.username,
                    recevedUser.email,
                    recevedUser.password,
                    recevedUser.phone_number,
                    recevedUser.bookmarks,
                    recevedUser.resetToken,
                    recevedUser.resetTokenExpiration,
                    recevedUser.role,
                    recevedUser._id
                );
                next();
            })
            .catch(err => console.log(err));
    }
});

// ─── ROUTES ─────────────────────────────────────────────────────────────────────
const pagesRouts = require("./routes/pages");
const adminsRouts = require("./routes/admin");

const registrationRoutes = require("./routes/auth");

// ─── USING THE ROUTES ───────────────────────────────────────────────────────────
app.use("/admin", adminsRouts);
app.use(pagesRouts);
app.use(registrationRoutes);

app.use((req, res, next) => {
    res.status(404).send("<h1>404 - Not Found!</h1>");
});

// const server = http2.createSecureServer({cert, key});

// server.listen(8443);

mongoConnect(() => {
    // console.log(client);
    console.log("connected !");
    app.listen(3000);
});
