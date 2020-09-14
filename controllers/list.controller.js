const List = require('../models/list.model');
const mongoDb = require('mongodb');
const ObjectId = mongoDb.ObjectId;

exports.getList = function (req, res) {
    List.fetchAll()
        .then(result => {
            res.send(result);
        }).catch(err => {
            console.log("error in getList", err);
        })
}

exports.update = function (req, res) {
    const listId = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const email = req.body.email;
    const list = new List(title, description,email, new ObjectId(listId));
    list.save().then(result => {
        res.send(result);
    }).catch(err => {
        console.log("error in update", err);
    })
}

exports.create = function (req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const email = req.body.email;
    const list = new List(title, description,email);
    list.save().then(result => {
        res.send(result);
        console.log("create success");
    }).catch(err => {
        console.log("error in update", err);
    })
}

exports.deleteNote = function (req, res) {
    const id = req.body.id;
    List.deleteById(id).then(result => {
        res.send(result);
        console.log("delete Success")
    }).catch(err => {
        console.log("error in deleteNote", err);
    })
}
