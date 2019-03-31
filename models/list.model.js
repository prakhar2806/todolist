const getDb = require('../util/database').getDb;
const mongoDb = require('mongodb');

class List {
    constructor(title, description, _id) {
        this.title = title,
            this.description = description,
            this._id = _id
    }

    static fetchAll() {
        const db = getDb();

        return db.collection('todolist')
            .find()
            .toArray()
            .then(list => {
                return list;
            })
            .catch(err => {
                console.log(err);
            });
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the product
            let id = new mongoDb.ObjectId(this._id);
            console.log("id", id);
            dbOp = db
                .collection('todolist')
                .updateOne({ _id: id }, { $set: this });
        } else {
            dbOp = db.collection('todolist').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(itemId) {
        const db = getDb();
        return db
            .collection('todolist')
            .deleteOne({ _id: new mongoDb.ObjectId(itemId) })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

}

module.exports = List;