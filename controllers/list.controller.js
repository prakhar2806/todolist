const List = require('../models/list.model');

exports.getList = function (req, res) {
    List.fetchAll()
        .then(result => {
            res.send(result);
        }).catch(err => {
            console.log(err);
        })
}