const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const list = require('./routes/list.route');
const mongoConnect = require('./util/database').mongoconnect;
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    next();
});

app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

class HandlerGenerator {
    login(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        // For the given email fetch user from DB
        let mockedemail = 'admin@gmail.com';
        let mockedPassword = 'password';

        if (email && password) {
            if (email === mockedemail && password === mockedPassword) {
                let token = jwt.sign({ email: email },
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
            } else {
                res.send(403).json({
                    success: false,
                    message: 'Incorrect email or password'
                });
            }
        } else {
            res.send(400).json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
        }
    }
    index(req, res) {
        res.json({
            success: true,
            message: 'Index page'
        });
    }
}

function main() {

    let app = express(); // Export app for other routes to use
    let handlers = new HandlerGenerator();
    // const port = process.env.PORT || 8000;
    app.use(bodyParser.urlencoded({ // Middleware
        extended: true
    }));
    app.use(bodyParser.json());
    // Routes & Handlers

    // app.post('/login', handlers.login);
    
    app.use('/login', list);

    app.get('/', middleware.checkToken, handlers.index);
    app.use('/list', middleware.checkToken, list);
    // app.listen(port, () => console.log(`Server is listening on port: ${port}`));

    mongoConnect((client) => {
        app.listen(port, () => console.log(`Listening on port ${port}`));
    })

}

main();

