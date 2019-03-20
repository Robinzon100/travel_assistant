const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = cb => {
  MongoClient.connect(
      "mongodb+srv://robinzon:rU0Hbn7IsLgLk4KF@travel-assistant-btaux.mongodb.net/travel-assistant?retryWrites=true", 
      {useNewUrlParser: true}
    )
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