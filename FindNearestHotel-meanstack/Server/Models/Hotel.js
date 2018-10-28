/**
 * Created by Navoda on 10/28/2018.
 */
'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Contact: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Longitude: {
        type: Number,
        required: true
    },
    Latitude: {
        type: Number,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    Location: {
        type: String,

        required: true
    },

});

const Hotel = mongoose.model('Hotel', HotelSchema);

module.exports = Hotel;