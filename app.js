// ─── BASE EXPORTS ───────────────────────────────────────────────────────────────   
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 

// ─── MY EXPORTS ─────────────────────────────────────────────────────────────────
const mongoConnect = require('./utils/database').mongoConnect;

// ─── VIEW ENGINE ────────────────────────────────────────────────────────────────    
app.set('view engine', 'ejs'); 
app.set('views', 'views');  

// ─── BODY PARSER ────────────────────────────────────────────────────────────────
app.use(bodyParser.urlencoded({
    extended: false,
})); 

// reading public folder
app.use(express.static(path.join(__dirname, 'public')));




// ─── ROUTES ─────────────────────────────────────────────────────────────────────
const toursRouts = require('./routes/tours'); 
const adminsRouts = require('./routes/admin'); 

// ─── USING THE ROUTES ───────────────────────────────────────────────────────────
app.use("/admin",adminsRouts);
app.use(toursRouts);

app.use((req, res, next) => { 
    res.status(404).send('404 - Not Found!');
}); 

mongoConnect((client =>{
    // console.log(client);
    console.log("connected !");
    app.listen(3000);

}))

