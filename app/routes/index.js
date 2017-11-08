'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var User = require('../models/users');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/dev/index.html');
		});
		
	app.post('/createnewuser', passport.authenticate('local-signup',{ failureFlash: 'Username already exists.' }), function(req,res){
		console.log("authentication successful");
		console.log(req.body.email);
		User.findOneAndUpdate({'local.username':req.body.username},{'local.email':req.body.email},{new:true}, function(err,data){
			if(err)throw err;
			console.log(data);
			res.redirect('/');
		});
	});
	
	app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/mybooks', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    app.post('/test', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.body);
    	res.send(req.body);
    });
    
    app.post('/data', function(req,res){
    	User.find({},function(err,data){
    		if(err)throw err;
    		console.log(data[0]);
    	});
    	res.end();
    });
    
    app.post('/deletedata', function(req,res){
    	User.find({}).remove().exec();
    	res.end();
    });

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};
