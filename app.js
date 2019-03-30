const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const video = require('./routes/video.route');
const mongoConnect = require('./util/database').mongoconnect;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/videos', video);

app.use((req, res, next) => {
  next();
});

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


mongoConnect((client) => {
  app.listen(port, () => console.log(`Listening on port ${port}`));
})