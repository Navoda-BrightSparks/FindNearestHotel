/**
 * Created by Navoda on 10/28/2018.
 */
var request = require('request');
const express = require('express'),
    mongoose = require('mongoose');
const Router = express.Router();
const bodyParser = require('body-parser');

mongoose.set('debug', false);
const PlaceModel = mongoose.model('Place');
const HotelModel = mongoose.model('Hotel');
var http = require("http");
var https = require("https");
var getJSON = require('get-json');
var _ = require("lodash")

const mongoURI = 'mongodb://localhost:27017/hotels'
// notice the mongoose.createConnection instead of mongoose.connect
const conn = mongoose.createConnection(mongoURI);
conn.on('open', function () {


    conn.db.listCollections().toArray(function (err, collectionNames) {
        if (err) {
            console.log(err);
            return;
        }
        if (collectionNames.length == 0) {
            console.log("yes")
            getJSON('https://www.atlasdl.com/api/test/', function (error, response) {
                var places = [];

                response.data.forEach(function (item) {
                    places.push(item.Location)
                    var Hotel = new HotelModel();
                    Hotel.Name = item.Hotel;
                    Hotel.Contact = "+94"+item.Contact;
                    Hotel.Amount = item.Amount
                    Hotel.Longitude = item.Longitude;
                    Hotel.Location = item.Location;
                    Hotel.Latitude = item.Latitude;
                    Hotel.Email = item.Email;
                    Hotel.save().then(hotel => {
                    }).catch(err => {
                        console.error(err);
                    });

                });
                var uniquePlaces = _.uniq(places)
                uniquePlaces.forEach(function (item) {
                    var Place = new PlaceModel();
                    Place.name = item;
                    Place.save().then(place => {
                    }).catch(err => {
                        console.error(err);
                    });
                });


            });
        }
    });
});
Router.get('/places', (req, res) => {
    PlaceModel.find().exec().then(places => {
        console.log(places)
        var placeArray = []
        places.forEach(function (item) {
            placeArray.push(item.name)
        });
        res.send(placeArray)
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });


});
Router.get('/names', (req, res) => {

    if (req.query.name) {
        console.log(req.query.name)
        HotelModel.find({Name: req.query.name}).exec().then(hotel => {
            console.log(hotel);
            res.json(hotel || {});
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    }
    else if (req.query.location) {
        console.log("yes")
        HotelModel.find({Location: req.query.location}).exec().then(hotel => {
            console.log(hotel);
            res.json(hotel || {});
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    }

    else if (req.query.amount) {
        console.log("yes")
        HotelModel.find({Amount: {$lte: req.query.amount}}).exec().then(hotel => {
            console.log(hotel);
            res.json(hotel || {});
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    }
    else {
        HotelModel.find().exec().then(hotels => {
            console.log(hotels);
            res.json(hotels)
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    }

});
Router.get('/both', (req, res) => {
    console.log(req.query.location);
    console.log(req.query.amount);
    HotelModel.find({$and: [{Amount: {$lte: req.query.amount}}, {Location: req.query.location}]}).exec().then(hotel => {
        console.log(hotel);
        res.json(hotel || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });


});


module.exports = Router;