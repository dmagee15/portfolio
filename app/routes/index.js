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
    
    app.post('/removerequest', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.body.id);
    	
    	Book.findOneAndUpdate({'_id':req.body.id},{$pull: {tradeRequests: req.user.local.username}},{new:true}, function(err,data){
    		if(err) throw err;
    		console.log("username: "+req.user.local.username);
    		console.log(JSON.stringify(data));
    		if(data.tradeConfirmUser==req.user.local.username){
    			Book.findOneAndUpdate({'_id':req.body.id},{tradeConfirmUser: '', tradeConfirmDate: ''},{new:true}, function(err,data){
    			if(err) throw err;
    				Book.find({tradeRequests: req.user.local.username }, function(err,data){
    				if(err) throw err;
    				console.log("GET YOUR TRADE REQUESTS");
    				console.log(JSON.stringify(data));
    				res.send(data);
    				});
    			});
    		}
    		else{
    			Book.find({tradeRequests: req.user.local.username }, function(err,data){
    			if(err) throw err;
    			console.log("GET YOUR TRADE REQUESTS");
    			console.log(JSON.stringify(data));
    			res.send(data);
    		});
    
    		}
    	});
    	
    });
    
    app.post('/removerequestforyou', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.body.id);
    	
    	Book.findOneAndUpdate({'_id':req.body.id},{$pull: {tradeRequests: req.body.tradeRequestUser}},{new:true}, function(err,data){
    		if(err) throw err;
    		Book.find({username: req.user.local.username, $where : "this.tradeRequests.length != 0"}, function(err,data){
    		if(err) throw err;
    		console.log("GET YOUR TRADE REQUESTS");
    		console.log(JSON.stringify(data));
    		var result = [];
    		var length=data.length;
    		for(var x=0;x<length;x++){
    			var requestLength = data[x].tradeRequests.length;
    			for(var y=0;y<requestLength;y++){
    				var request = {
    					"_id": data[x]._id,
    					"tradeConfirmDate": data[x].tradeConfirmDate,
    					"tradeConfirmUser": data[x].tradeConfirmUser,
    					"username": data[x].username,
    					"location": data[x].location,
    					"description": data[x].description,
    					"pageCount": data[x].pageCount,
    					"publishedDate": data[x].publishedDate,
    					"author": data[x].author,
    					"thumbnail": data[x].thumbnail,
    					"title": data[x].title,
    					"tradeRequestUser": data[x].tradeRequests[y]
    				}
    				result.push(request);
    			}
    		}
    		res.send(result);
    	});
    	});
    	
    });
    
    app.post('/approverequest', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.body.id);
    	
    	Book.findOneAndUpdate({'_id':req.body.id},{tradeConfirmUser: req.body.tradeRequestUser, tradeConfirmDate: new Date()},{new:true}, function(err,data){
    		if(err) throw err;
    		console.log("username: "+req.user.local.username);
    		console.log(JSON.stringify(data));
    		Book.find({username: req.user.local.username, $where : "this.tradeRequests.length != 0"}, function(err,data){
    		if(err) throw err;
    		console.log("GET YOUR TRADE REQUESTS");
    		console.log(JSON.stringify(data));
    		var result = [];
    		var length=data.length;
    		for(var x=0;x<length;x++){
    			var requestLength = data[x].tradeRequests.length;
    			for(var y=0;y<requestLength;y++){
    				var request = {
    					"_id": data[x]._id,
    					"tradeConfirmDate": data[x].tradeConfirmDate,
    					"tradeConfirmUser": data[x].tradeConfirmUser,
    					"username": data[x].username,
    					"location": data[x].location,
    					"description": data[x].description,
    					"pageCount": data[x].pageCount,
    					"publishedDate": data[x].publishedDate,
    					"author": data[x].author,
    					"thumbnail": data[x].thumbnail,
    					"title": data[x].title,
    					"tradeRequestUser": data[x].tradeRequests[y]
    				}
    				result.push(request);
    			}
    		}
    		res.send(result);
    	});
    	});
    	
    });
    
    app.post('/unapproverequest', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.body.id);
    	
    	Book.findOneAndUpdate({'_id':req.body.id},{tradeConfirmUser: '', tradeConfirmDate: ''},{new:true}, function(err,data){
    		if(err) throw err;
    		console.log("username: "+req.user.local.username);
    		console.log(JSON.stringify(data));
    		Book.find({username: req.user.local.username, $where : "this.tradeRequests.length != 0"}, function(err,data){
    		if(err) throw err;
    		console.log("GET YOUR TRADE REQUESTS");
    		console.log(JSON.stringify(data));
    		var result = [];
    		var length=data.length;
    		for(var x=0;x<length;x++){
    			var requestLength = data[x].tradeRequests.length;
    			for(var y=0;y<requestLength;y++){
    				var request = {
    					"_id": data[x]._id,
    					"tradeConfirmDate": data[x].tradeConfirmDate,
    					"tradeConfirmUser": data[x].tradeConfirmUser,
    					"username": data[x].username,
    					"location": data[x].location,
    					"description": data[x].description,
    					"pageCount": data[x].pageCount,
    					"publishedDate": data[x].publishedDate,
    					"author": data[x].author,
    					"thumbnail": data[x].thumbnail,
    					"title": data[x].title,
    					"tradeRequestUser": data[x].tradeRequests[y]
    				}
    				result.push(request);
    			}
    		}
    		res.send(result);
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
    
    app.get('/getallbooksdata', function(req,res){
    	console.log("Fetch request successful");

    	Book.find({}, function(err,data){
    		if(err) throw err;
    		console.log(JSON.stringify(data));
    		res.send(data);
    	});
    	
    });
    
    app.get('/getyourtraderequests', function(req,res){
    	console.log("Fetch request successful");

    	Book.find({tradeRequests: req.user.local.username }, function(err,data){
    		if(err) throw err;
    		console.log("GET YOUR TRADE REQUESTS");
    		console.log(JSON.stringify(data));
    		res.send(data);
    	});
    	
    });
    
    app.get('/getrequestsforyou', function(req,res){
    	console.log("Fetch request successful");

    	Book.find({username: req.user.local.username, $where : "this.tradeRequests.length != 0"}, function(err,data){
    		if(err) throw err;
    		console.log("GET YOUR TRADE REQUESTS");
    		console.log(JSON.stringify(data));
    		var result = [];
    		var length=data.length;
    		for(var x=0;x<length;x++){
    			var requestLength = data[x].tradeRequests.length;
    			for(var y=0;y<requestLength;y++){
    				var request = {
    					"_id": data[x]._id,
    					"tradeConfirmDate": data[x].tradeConfirmDate,
    					"tradeConfirmUser": data[x].tradeConfirmUser,
    					"username": data[x].username,
    					"location": data[x].location,
    					"description": data[x].description,
    					"pageCount": data[x].pageCount,
    					"publishedDate": data[x].publishedDate,
    					"author": data[x].author,
    					"thumbnail": data[x].thumbnail,
    					"title": data[x].title,
    					"tradeRequestUser": data[x].tradeRequests[y]
    				}
    				result.push(request);
    			}
    		}
    		res.send(result);
    	});
    	
    });
    
    app.post('/requestbook', function(req,res){
    	console.log("Fetch request successful");

    	Book.find({'_id':req.body.id}, function(err,data){
    		if(err) throw err;
    		console.log(JSON.stringify(data));
    		if(data[0].username == req.user.local.username){
    			console.log("this is your book");
    			Book.find({}, function(err,data){
    					if(err) throw err;
    					console.log(JSON.stringify(data));
    					res.send(data);
    				});
    		}
    		else
    		if(data[0].tradeRequests.indexOf(req.user.local.username)==-1){
    			Book.findOneAndUpdate({'_id':req.body.id},{$push: {tradeRequests: req.user.local.username}},{new:true}, function(err,data){
    				if(err) throw err;
    				console.log("tradeRequests: "+data.tradeRequests);
    				Book.find({}, function(err,data){
    					if(err) throw err;
    					console.log(JSON.stringify(data));
    					res.send(data);
    				});
    			});
    		}
    		else{
    			Book.findOneAndUpdate({'_id':req.body.id},{$pull: {tradeRequests: req.user.local.username}},{new:true}, function(err,data){
    				if(err) throw err;
    				console.log("tradeRequests: "+data.tradeRequests);
    				Book.find({}, function(err,data){
    					if(err) throw err;
    					console.log(JSON.stringify(data));
    					res.send(data);
    				});
    			});
    		}
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
