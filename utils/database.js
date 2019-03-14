const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (cb) =>{
    MongoClient.connect(
        'mongodb+srv://robinzon:rU0Hbn7IsLgLk4KF@travel-assistant-btaux.mongodb.net/test?retryWrites=true',
        { useNewUrlParser: true }
    )
    .then(client =>{
        console.log('connected !');
        cb(client);
    })
    .catch(err =>{
        console.log(err);
    });
};

module.exports = mongoConnect;