'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
    bookData:{
        title: String,
        thumbnail: String,
        author: String,
        publishedDate: String,
        location: String,
        username: String,
        tradeRequests: Array,
        tradeConfirm: Boolean,
        tradeConfirmUser: String
    }
});

module.exports = mongoose.model('Book', Book);
