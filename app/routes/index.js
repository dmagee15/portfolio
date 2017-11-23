'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var User = require('../models/users');
var Book = require('../models/books');

module.exports = function (app, passport, googleBooks) {

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
		User.findOneAndUpdate({'local.username':req.body.username},{'local.email':req.body.email,'local.location':req.body.location},{new:true}, function(err,data){
			if(err)throw err;
			var userData = {
				email: data.local.email,
				location: data.local.location,
				about: data.local.about,
				username: data.local.username,
				tradeRequestsForYou: data.local.tradeRequestsForYou,
				tradeRequests: data.local.tradeRequests,
				myBooks: data.local.myBooks
			};
			console.log("USER DATA: "+JSON.stringify(userData));
			res.send(userData);
		});
	});
	
	app.post('/login', passport.authenticate('local-login', { failureFlash: 'Username already exists.' }), function(req,res){

		User.find({'local.username':req.user.local.username},{new:true}, function(err,data){
			if(err)throw err;
			console.log(JSON.stringify(data));
			var userData = {
				email: req.user.local.email,
				location: req.user.local.location,
				about: req.user.local.about,
				username: req.user.local.username,
				tradeRequestsForYou: req.user.local.tradeRequestsForYou,
				tradeRequests: req.user.local.tradeRequests,
				myBooks: req.user.local.myBooks
			};
			console.log("USER DATA: "+JSON.stringify(req.user));
			res.send(userData);
		});
	});
    
    app.post('/test', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.body);
    	res.send(req.body);
    });
    
    app.post('/findbook', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.body.searchInput);
    	
    	googleBooks.search(req.body.searchInput, function(error, results) {
		if ( ! error ) {
        	var resultArray = Object.assign({},results[0]);
        	resultArray.thumbnail = resultArray.thumbnail.replace(/=1&zoom=1&edge=curl&source=gbs_api/,'').replace(/http/,'https');
        	console.log(resultArray);
        	
        	var newBook = new Book();
        	newBook.title = resultArray.title;
        	newBook.thumbnail = resultArray.thumbnail;
        	newBook.author = resultArray.authors[0];
        	newBook.publishedDate = resultArray.publishedDate;
        	newBook.pageCount = resultArray.pageCount;
        	newBook.description = resultArray.description;
        	newBook.location = req.user.local.location;
        	newBook.username = req.user.local.username;
        	newBook.tradeRequests = [];
        	newBook.tradeConfirmUser = '';
        	newBook.tradeConfirmDate = '';
        	console.log("New Book");
        	console.log(newBook);
        	newBook.save(function(err){
        		if(err) throw err;
        		Book.find({'username':req.user.local.username}, function(err,data){
    			if(err) throw err;
    			console.log("username: "+req.user.local.username);
    			console.log(JSON.stringify(data));
    			res.send(data);
        		});
    		});
    	} else {
        		console.log(error);
        		res.end();
    		}
		});
    	
    });
    
    app.post('/removebook', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.body.id);
    	
    	Book.find({'_id':req.body.id}).remove().exec(function(err, data){
    		if(err) throw err;
    		Book.find({'username':req.user.local.username}, function(err,data){
    		if(err) throw err;
    		console.log("username: "+req.user.local.username);
    		console.log(JSON.stringify(data));
    		res.send(data);
    		});
    	});
    	
    });
    
    
    app.get('/getprofiledata', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.user.local.username);
    	
    	Book.find({'username':req.user.local.username}, function(err,data){
    		if(err) throw err;
    		console.log("username: "+req.user.local.username);
    		console.log(JSON.stringify(data));
    		res.send(data);
    	});
    	
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

	app.route('/logout')
		.get(function (req, res) {
			console.log("Before logout: "+JSON.stringify(req.user));
			req.logout();
			console.log("After logout: "+JSON.stringify(req.user));
			res.end();
		});
		
	app.route('/logstatus')
		.get(function (req, res){
			console.log("LOG STATUS: "+req.user);
			if(Boolean(req.user)==false){
				res.send('false');
			}
			else{
				User.find({'local.username':req.user.local.username}, function(err, data){
					if(err) throw err;
					var userData = {
					email: req.user.local.email,
					location: req.user.local.location,
					about: req.user.local.about,
					username: req.user.local.username,
					tradeRequestsForYou: req.user.local.tradeRequestsForYou,
					tradeRequests: req.user.local.tradeRequests,
					myBooks: req.user.local.myBooks
					};
					console.log("FOUND DATA FOR LOGIN: "+JSON.stringify(userData));
					res.send(userData);
				});
			}
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
