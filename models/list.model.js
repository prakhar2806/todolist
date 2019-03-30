const getDb = require('../util/database').getDb;
const mongoDb = require('mongodb');

class List {
    constructor(title, date) {
        this.title = title,
            this.time = date
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

}

module.exports = List;