/**
 * Created by Navoda on 10/28/2018.
 */
'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    vehicle: {
        type: String,
        required: true
    },
    ranking: {
        type: Number,
        unique: true,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

const Hotel = mongoose.model('Driver', HotelSchema);

module.exports = Driver;