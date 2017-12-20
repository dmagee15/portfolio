'use strict';

var path = process.cwd();
var User = require('../models/users');
var Book = require('../models/books');

module.exports = function (app, passport, googleBooks) {
//User.find({}).remove().exec();
//Book.find({}).remove().exec();
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	app.route('/')
		.get(function (req, res) {
			res.render('homepage', {
			});
		});
		
	app.post('/createnewuser', passport.authenticate('local-signup',{ failureRedirect: '/signupfail', failureFlash: false }), function(req,res){
		console.log("authentication successful");
		console.log(req.body.email);
		User.findOneAndUpdate({'local.username':req.body.username},{'local.email':req.body.email,'local.city':req.body.city,'local.state':req.body.state,'local.fullName':req.body.fullName},{new:true}, function(err,data){
			if(err)throw err;
			var userData = {
				email: data.local.email,
				city: data.local.city,
				state: data.local.state,
				fullName: data.local.fullName,
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
	
	app.post('/login', passport.authenticate('local-login', { failureRedirect: '/loginfail', failureFlash: false }), function(req,res){

		User.find({'local.username':req.user.local.username}, function(err,data){
			if(err)throw err;
			console.log(JSON.stringify(data));
			var userData = {
				email: req.user.local.email,
				city: req.user.local.city,
				state: req.user.local.state,
				fullName: req.user.local.fullName,
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
	
	app.get('/loginfail', function(req,res){
		res.send({});
	});
	
	app.get('/signupfail', function(req,res)
	{
		res.send({});
	});
    
    app.post('/test', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.body);
    	res.send(req.body);
    });
    
    app.post('/findbook', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.body.searchInput);
    	if(req.body.searchInput==''){
    		res.send({});
    	}
    	else{
    		
    	
    	googleBooks.search(req.body.searchInput, function(error, results) {
		if ( ! error ) {
			console.log("RESULTS");
			if(results.length==0){
				res.send({});
			}
			else{
			console.log(JSON.stringify(results));
        	var resultArray = Object.assign({},results[0]);
        	resultArray.thumbnail = (resultArray.thumbnail)?resultArray.thumbnail.replace(/=1&zoom=1&edge=curl&source=gbs_api/,'').replace(/http/,'https'):'';

        	var newBook = new Book();
        	newBook.title = resultArray.title;
        	newBook.thumbnail = resultArray.thumbnail;
        	newBook.author = (resultArray.authors)?resultArray.authors[0]:'';
        	newBook.publishedDate = resultArray.publishedDate;
        	newBook.pageCount = resultArray.pageCount;
        	newBook.description = resultArray.description;
        	newBook.city = req.user.local.city;
        	newBook.state = req.user.local.state;
        	newBook.fullName = req.user.local.fullName;
        	newBook.username = req.user.local.username;
        	newBook.tradeRequests = [];
        	newBook.tradeConfirmUser = '';
        	newBook.tradeConfirmDate = '';
        	newBook.tradeConfirmEmail = '';
        	newBook.tradeConfirmCity = '';
        	newBook.tradeConfirmState = '';
        	newBook.email = req.user.local.email;
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
		}
    	} else {
        		console.log(error);
        		res.end();
    		}
		});
    	}
    });
    
    app.post('/searchallbooks', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.body.searchInput);
    	
    	Book.find({}, function(err,data){
    		if(err) throw err;
    		console.log(JSON.stringify(data));
    		var resultArray = [];
    		var regex = new RegExp(req.body.searchInput, 'i');
    		var length = data.length;
    		for(var x=0;x<length;x++){
    			if(regex.test(data[x].title)||regex.test(data[x].username)){
    				resultArray.push(data[x]);
    			}
    		}
    		res.send(resultArray);
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
    	User.find({'local.username':req.body.tradeRequestUser},function(err,userdata){
    		if(err) throw err;
    		Book.findOneAndUpdate({'_id':req.body.id},{$pull: {tradeRequests: req.body.tradeRequestUser, tradeRequestsCities: userdata[0].local.city, tradeRequestsStates: userdata[0].local.state}},{new:true}, function(err,data){
    		if(err) throw err;
    		
    		User.find({}, function(err,users){
				console.log("USERS");
				console.log(users);
    	Book.find({username: req.user.local.username, $where : "this.tradeRequests.length != 0"}, function(err,data){
    		if(err) throw err;

    		var result = [];
    		var length=data.length;
    		var usernameArray = [];
    		for(var z=0;z<users.length;z++){
    			usernameArray.push(users[z].local.username);
    		}
    		for(var x=0;x<length;x++){
    			var requestLength = data[x].tradeRequests.length;
    			for(var y=0;y<requestLength;y++){
						
    					var request = {
    					"_id": data[x]._id,
    					"tradeConfirmDate": data[x].tradeConfirmDate,
    					"tradeConfirmUser": data[x].tradeConfirmUser,
    					"tradeConfirmCity": data[x].tradeConfirmCity,
    					"tradeConfirmState": data[x].tradeConfirmState,
    					"tradeConfirmEmail": data[x].tradeConfirmEmail,
    					"email": data[x].email,
    					"username": data[x].username,
    					"city": data[x].city,
    					"state": data[x].state,
    					"fullName": data[x].fullName,
    					"description": data[x].description,
    					"pageCount": data[x].pageCount,
    					"publishedDate": data[x].publishedDate,
    					"author": data[x].author,
    					"thumbnail": data[x].thumbnail,
    					"title": data[x].title,
    					"tradeRequestUser": data[x].tradeRequests[y],
    					"tradeRequestCity": users[usernameArray.indexOf(data[x].tradeRequests[y])].local.city,
    					"tradeRequestState": users[usernameArray.indexOf(data[x].tradeRequests[y])].local.state
    				}
    				result.push(request);

    			}
    		}
    		res.send(result);
    	});
		});
    	});
    	});
    	
    	
    });
    
    app.post('/approverequest', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.body.id);
    	User.find({'local.username':req.body.tradeRequestUser}, function(err,userdata){
    		if(err) throw err;
    		Book.findOneAndUpdate({'_id':req.body.id},{tradeConfirmUser: req.body.tradeRequestUser, tradeConfirmDate: new Date(), tradeConfirmCity: userdata[0].local.city, tradeConfirmState: userdata[0].local.state, tradeConfirmEmail: userdata[0].local.email},{new:true}, function(err,data){
    		if(err) throw err;
    		console.log("username: "+req.user.local.username);
    		console.log(JSON.stringify(data));
    		User.find({}, function(err,users){
				console.log("USERS");
				console.log(users);
    	Book.find({username: req.user.local.username, $where : "this.tradeRequests.length != 0"}, function(err,data){
    		if(err) throw err;

    		var result = [];
    		var length=data.length;
    		var usernameArray = [];
    		for(var z=0;z<users.length;z++){
    			usernameArray.push(users[z].local.username);
    		}
    		for(var x=0;x<length;x++){
    			var requestLength = data[x].tradeRequests.length;
    			for(var y=0;y<requestLength;y++){
						
    					var request = {
    					"_id": data[x]._id,
    					"tradeConfirmDate": data[x].tradeConfirmDate,
    					"tradeConfirmUser": data[x].tradeConfirmUser,
    					"tradeConfirmCity": data[x].tradeConfirmCity,
    					"tradeConfirmState": data[x].tradeConfirmState,
    					"tradeConfirmEmail": data[x].tradeConfirmEmail,
    					"email": data[x].email,
    					"username": data[x].username,
    					"city": data[x].city,
    					"state": data[x].state,
    					"fullName": data[x].fullName,
    					"description": data[x].description,
    					"pageCount": data[x].pageCount,
    					"publishedDate": data[x].publishedDate,
    					"author": data[x].author,
    					"thumbnail": data[x].thumbnail,
    					"title": data[x].title,
    					"tradeRequestUser": data[x].tradeRequests[y],
    					"tradeRequestCity": users[usernameArray.indexOf(data[x].tradeRequests[y])].local.city,
    					"tradeRequestState": users[usernameArray.indexOf(data[x].tradeRequests[y])].local.state
    				}
    				result.push(request);

    			}
    		}
    		res.send(result);
    	});
		});
    	});
    	});
    });
    
    app.post('/unapproverequest', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.body.id);
    	
    	Book.findOneAndUpdate({'_id':req.body.id},{tradeConfirmUser: '', tradeConfirmDate: '', tradeConfirmCity: '', tradeConfirmState: '', tradeConfirmEmail: ''},{new:true}, function(err,data){
    		if(err) throw err;
    		console.log("username: "+req.user.local.username);
    		console.log(JSON.stringify(data));
    		User.find({}, function(err,users){
				console.log("USERS");
				console.log(users);
    	Book.find({username: req.user.local.username, $where : "this.tradeRequests.length != 0"}, function(err,data){
    		if(err) throw err;

    		var result = [];
    		var length=data.length;
    		var usernameArray = [];
    		for(var z=0;z<users.length;z++){
    			usernameArray.push(users[z].local.username);
    		}
    		for(var x=0;x<length;x++){
    			var requestLength = data[x].tradeRequests.length;
    			for(var y=0;y<requestLength;y++){
						
    					var request = {
    					"_id": data[x]._id,
    					"tradeConfirmDate": data[x].tradeConfirmDate,
    					"tradeConfirmUser": data[x].tradeConfirmUser,
    					"tradeConfirmCity": data[x].tradeConfirmCity,
    					"tradeConfirmState": data[x].tradeConfirmState,
    					"tradeConfirmEmail": data[x].tradeConfirmEmail,
    					"email": data[x].email,
    					"username": data[x].username,
    					"city": data[x].city,
    					"state": data[x].state,
    					"fullName": data[x].fullName,
    					"description": data[x].description,
    					"pageCount": data[x].pageCount,
    					"publishedDate": data[x].publishedDate,
    					"author": data[x].author,
    					"thumbnail": data[x].thumbnail,
    					"title": data[x].title,
    					"tradeRequestUser": data[x].tradeRequests[y],
    					"tradeRequestCity": users[usernameArray.indexOf(data[x].tradeRequests[y])].local.city,
    					"tradeRequestState": users[usernameArray.indexOf(data[x].tradeRequests[y])].local.state
    				}
    				result.push(request);

    			}
    		}
    		res.send(result);
    	});
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
		User.find({}, function(err,users){
				console.log("USERS");
				console.log(users);
    	Book.find({username: req.user.local.username, $where : "this.tradeRequests.length != 0"}, function(err,data){
    		if(err) throw err;

    		var result = [];
    		var length=data.length;
    		var usernameArray = [];
    		for(var z=0;z<users.length;z++){
    			usernameArray.push(users[z].local.username);
    		}
    		for(var x=0;x<length;x++){
    			var requestLength = data[x].tradeRequests.length;
    			for(var y=0;y<requestLength;y++){
						
    					var request = {
    					"_id": data[x]._id,
    					"tradeConfirmDate": data[x].tradeConfirmDate,
    					"tradeConfirmUser": data[x].tradeConfirmUser,
    					"tradeConfirmCity": data[x].tradeConfirmCity,
    					"tradeConfirmState": data[x].tradeConfirmState,
    					"tradeConfirmEmail": data[x].tradeConfirmEmail,
    					"email": data[x].email,
    					"username": data[x].username,
    					"city": data[x].city,
    					"state": data[x].state,
    					"fullName": data[x].fullName,
    					"description": data[x].description,
    					"pageCount": data[x].pageCount,
    					"publishedDate": data[x].publishedDate,
    					"author": data[x].author,
    					"thumbnail": data[x].thumbnail,
    					"title": data[x].title,
    					"tradeRequestUser": data[x].tradeRequests[y],
    					"tradeRequestCity": users[usernameArray.indexOf(data[x].tradeRequests[y])].local.city,
    					"tradeRequestState": users[usernameArray.indexOf(data[x].tradeRequests[y])].local.state
    				}
    				result.push(request);

    			}
    		}
    		res.send(result);
    	});
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
					city: req.user.local.city,
					state: req.user.local.state,
					fullName: req.user.local.fullName,
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

};