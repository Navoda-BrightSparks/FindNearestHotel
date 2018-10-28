/**
 * Created by Navoda on 10/27/2018.
 */
'use strict';

const bodyParser = require('body-parser'),
    express = require('express'),
    mongoose = require('mongoose');

mongoose.Promise = global.Promise;

require('./Server/Models/Places');

const HotelRoute = require('./Server/Routes/main.route.js');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/hotels', err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});

app.use('/app', express.static(__dirname + '/Public'));
app.use('/app/modules', express.static(__dirname + '/Static'));

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/Public/index.html');
});

app.use('/hotels', HotelRoute);

app.get('/app/*', (req, res, next) => {
    res.sendFile(__dirname + '/Public/index.html');
});

app.listen(3002, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('app listening on port 3002');
});