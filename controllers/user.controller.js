const User = require('../models/user.model');
let jwt = require('jsonwebtoken');
let config = require('./../config');

exports.authenticate = function (req, res) {
    let loggingUsername = req.body.username;
    let loggingPassword = req.body.password;
    console.log(loggingUsername, loggingPassword);
    User.fetchAll()
        .then(result => {

            result.forEach(element => {
                if (element.username === loggingUsername &&
                    element.password === loggingPassword) {

                    let token = jwt.sign({ username: loggingUsername },
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