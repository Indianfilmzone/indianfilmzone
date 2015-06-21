// vendor libraries
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var path = require('path');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy=require('passport-facebook').Strategy;
var TwitterStrategy=require('passport-twitter').Strategy;
var GoogleTokenStrategy = require('passport-google-token').Strategy;
//var RememberMeStrategy  = require('passport-remember-me').Strategy; 

var fbConfig = require('./config').FACEBOOK;
var twitterConfig = require('./config').TWITTER;
var googleConfig= require('./config').GOOGLE;


// custom libraries
// routes
var route = require('./route');
// model
var Model = require('./model');

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: 'secret strategic xxzzz code'}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(passport.authenticate('remember-me'));
// GET
app.get('/', route.index);

// signin
// GET
app.get('/signin', route.signIn);
// POST
app.post('/signin', route.signInPost);

// signup
// GET
app.get('/signup', route.signUp);
// POST
app.post('/signup', route.signUpPost);

// logout
// GET
app.get('/signout', route.signOut);



//route for facebook authentication and login
//different scopes while logging in
app.get('/login/facebook', passport.authenticate('facebook', { scope : 'email' }
));

//handle the callback after facebook has authenticated the user
app.get('/login/facebook/callback', passport.authenticate('facebook', {
 successRedirect : '/',
 failureRedirect : '/signin'
})
);




/********************************/
// 404 not found
app.use(route.notFound404);

var server = app.listen(app.get('port'), function(err) {
   if(err) throw err;

   var message = 'Server is running @ http://localhost:' + server.address().port;
   console.log(message);
});



//=============Passport======================
	passport.serializeUser(function(user, done) {
	  done(null, user.username);
	});

	passport.deserializeUser(function(username, done) {
	   new Model.User({username: username}).fetch().then(function(user) {
	      done(null, user);
	   });
	});
	
passport.use(new LocalStrategy(function(username, password, done) {
	   new Model.User({username: username}).fetch().then(function(data) {
	      var user = data;
	      if(user === null) {
	         return done(null, false, {message: 'Invalid username or password'});
	      } else {
	         user = data.toJSON();
	         if(!bcrypt.compareSync(password, user.password)) {
	            return done(null, false, {message: 'Invalid username or password'});
	         } else {
	        	 
	        	 return done(null, user);
	        	 /*
	        	 if (!req.body.remember_me) {
	        		 return done(null, user);
	      	   	 }else{
		      	   	 var token = utils.generateToken(64);
		      	   	 Token.save(token, { username: user.username }, function(err) {
		     	      if (err) { return done(err); }
		     	      res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
		     	      return done(null, user);
	     	    });
	     	    
	      	   	 }
	            */
	         }
	      }
	   });
	   
	    
	}));

passport.use('facebook', new FacebookStrategy({
	  clientID        : fbConfig.appID,
	  clientSecret    : fbConfig.appSecret,
	  callbackURL     : fbConfig.callbackUrl
	},
	  // facebook will send back the tokens and profile
	  function(access_token, refresh_token, profile, done) {
	    // asynchronous
	    process.nextTick(function() {
	     console.log(profile.id);
	     console.log(access_token);	     
	     console.log(profile.name.givenName);
	     console.log(profile.name.familyName);
	     console.log(profile.emails[0].value);
	     
		   new Model.User({username: profile.id}).fetch().then(function(data) {
			      var user = data;
			      if(user === null) {
			        // return done(null, false, {message: 'Profile not found'});		
			    	
			          var fbUser = new Model.User({username: profile.id, password: null});

			          fbUser.save().then(function(model) {
			        	  if (err)
				                throw err;
				 
				              // if successful, return the new user
				              return done(null, fbUser);
			          });	
			          
			         
			      } else {
			         user = data.toJSON();		
			         return done(null, user);			         
			      }
			   });     
	     
	    });
	}));

/*passport.use(new RememberMeStrategy(
		  function(token, done) {
		    Token.consume(token, function (err, user) {
		      if (err) { return done(err); }
		      if (!user) { return done(null, false); }
		      return done(null, user);
		    });
		  },
		  function(user, done) {
		    var token = utils.generateToken(64);
		    Token.save(token, { username: user.username }, function(err) {
		      if (err) { return done(err); }
		      return done(null, token);
		    });
		  }
		));*/

