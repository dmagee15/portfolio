'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    local:{
        username: String,
        password: String,
        email: String,
        location: String,
        about: String,
        myBooks: Array,
        tradeRequests: Array,
        tradeRequestsForYou: Array
    }
});

module.exports = mongoose.model('User', User);
