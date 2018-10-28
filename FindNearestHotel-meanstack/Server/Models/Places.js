/**
 * Created by Navoda on 10/28/2018.
 */

'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    name: {
        type: String
    }
});

var Place = mongoose.model('Place',PlaceSchema);

module.exports = Place;

