'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    local:{
        username: String,
        password: String,
        email: String,
        about: String,
        myBooks: Array,
        tradeRequests: Array,
        tradeRequestsForYou: Array,
        fullName: String,
        city: String,
        state: String
    }
});

module.exports = mongoose.model('User', User);
