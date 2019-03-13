const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 

// ─── CONSTOLLER IMPORTS ──────────────────────────────────────────────────────────────── 

// ─── ROUTES ─────────────────────────────────────────────────────────────────────
const toursRout = require('./routes/tours');

// ─── VIEW ENGINE ────────────────────────────────────────────────────────────────    
app.set('view engine', 'ejs'); 
app.set('views', 'views');  

// ─── BODY PARSER ────────────────────────────────────────────────────────────────
app.use(bodyParser.urlencoded({
    extended: false,
})); 

// reading public folder
app.use(express.static(path.join(__dirname, 'public')));

// ─── USING THE ROUTES ───────────────────────────────────────────────────────────
app.use(toursRout);

app.use((req, res, next) => {
    res.status(404).send('404 - Not Found!');
}); 


app.listen(3000);