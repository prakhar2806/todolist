const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        "mongodb+srv://Prakhar:WORDlife2806!@cluster0-7v3cp.mongodb.net/shop?retryWrites=true"
        ).then(client => {
            console.log("connected");
            _db = client.db();

            callback();

        })
        .catch(err => {
            console.log(err);
            throw (err);
        })
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'no database found';
}


exports.mongoconnect = mongoConnect;
exports.getDb = getDb;