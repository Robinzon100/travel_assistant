//
// ─── BASE IMPORTS ───────────────────────────────────────────────────────────────
//
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

//
// ─── MY IMPORTS ─────────────────────────────────────────────────────────────────
//
const MONGODB_URI = require('../app').MONGODB_URI;

let _db;

const mongoConnect = cb => {
  MongoClient.connect( 
      MONGODB_URI, 
      {useNewUrlParser: true})
    .then(client => {
      _db = client.db();
      cb(client);
    })
    .catch(err => console.log(err));
};


const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "no database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;