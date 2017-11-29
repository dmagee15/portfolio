'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
        title: String,
        thumbnail: String,
        author: String,
        description: String,
        pageCount: Number,
        publishedDate: String,
        city: String,
        state: String,
        fullName: String,
        email: String,
        username: String,
        tradeRequests: Array,
        tradeConfirmUser: String,
        tradeConfirmDate: String,
        tradeConfirmCity: String,
        tradeConfirmState: String,
        tradeConfirmEmail: String
});

module.exports = mongoose.model('Book', Book);
