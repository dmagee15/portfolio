'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username: String,
    password: String,
    email: String,
    myBooks: Array
});

module.exports = mongoose.model('User', User);
