const User = require('../models/user.model');
let jwt = require('jsonwebtoken');
let config = require('./../config');

exports.authenticate = function (req, res) {
    console.log(req.body.email);
    let loggingEmailId = req.body.email;
    let loggingPassword = req.body.password;
    console.log(loggingEmailId, loggingPassword);
    User.fetchAll()
        .then(result => {

            result.forEach(element => {
                if (element.email === loggingEmailId &&
                    element.password === loggingPassword) {

                    let token = jwt.sign({ email: loggingEmailId },
                        config.secret,
                        {
                            expiresIn: '24h' // expires in 24 hours
                        }
                    );
                    // return the JWT token for the future API calls
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    });
                }
            });


            // res.send(result);
        }).catch(err => {
            console.log(err);
        })
}

exports.adduser = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    let user = new User(username, password, email);
    user.save().then(result => {
        res.send(result);
    }).catch(err=>{
        console.log(err);
    })
}