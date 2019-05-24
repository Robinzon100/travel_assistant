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





// ─── VIEW ENGINE ────────────────────────────────────────────────────────────────
app.set("view engine", "ejs");
app.set("views", "views");

// ─── BODY PARSER ────────────────────────────────────────────────────────────────
app.use(bodyParser.urlencoded({ extended: true }));

// reading public folder
app.use(express.static(path.join(__dirname, "public")));






const store = new MongoDBStore({
    uri: MONGODB_URI,
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
