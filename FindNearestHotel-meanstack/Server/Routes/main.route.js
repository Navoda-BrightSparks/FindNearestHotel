/**
 * Created by Navoda on 10/28/2018.
 */
var request=require('request');
const express = require('express'),
    mongoose = require('mongoose');
const Router = express.Router();
const bodyParser = require('body-parser');

mongoose.set('debug', false);
const PlaceModel = mongoose.model('Place');
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
        if(collectionNames.length == 0){
            console.log("yes")
            getJSON('https://www.atlasdl.com/api/test/', function(error, response){
                var places = [];
                response.data.forEach(function (item) {
                   places.push(item.Location)
                });
                var uniquePlaces = _.uniq (places)
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

module.exports = Router;