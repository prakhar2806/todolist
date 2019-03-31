const getDb = require('../util/database').getDb;
const mongoDb = require('mongodb');

class User {
    constructor(username, password) {
        this.username = username,
            this.password = password
    }

    static fetchAll() {
        const db = getDb();

        return db.collection('users')
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

module.exports = User;