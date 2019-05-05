const getDb = require('../util/database').getDb;
const mongoDb = require('mongodb');

class User {
    constructor(username, password, email) {
        this.username = username,
            this.password = password,
            this.email = email
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

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this)
            .then(result => {
                console.log(result, "SaveSuccess")
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

}

module.exports = User;