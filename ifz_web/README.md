ExpressJs + Passport.js + MySQL Authentication
===========================
An authentication system using passportjs and mysql as the data storage for the users, while using expressjs module to facilitate the routing.


http://yifeed.com/passportjs-mysql-expressjs-authentication.html

facebook authentication
319937498027323
bb0695196e1aba5cc3de65a4e2e0391b


https://apps.twitter.com/app/new


Gmail authentication
https://console.developers.google.com/project/indianfilmzone-983/apiui/credential
https://developers.google.com/identity/sign-in/web/devconsole-project
Client ID	
129321576133-kc4jnvqiku0oml592b84e23l961h07qv.apps.googleusercontent.com
Email address	
129321576133-kc4jnvqiku0oml592b84e23l961h07qv@developer.gserviceaccount.com
Client secret	
S8KB-dLO_zKE-LZohJMs0iHr
Redirect URIs	
http://127.0.0.1:3000/login/google/callback
JavaScript origins	
http://localhost:3000/
















*/
/********************************/
 /*
//route for twitter authentication and login
//different scopes while logging in
app.get('/login/twitter',  
passport.authenticate('twitter')
);

//handle the callback after facebook has authenticated the user
app.get('/login/twitter/callback',
passport.authenticate('twitter', {
 successRedirect : '/twitter',
 failureRedirect : '/'
})
);

//GET Twitter View Page 
app.get('/twitter', isAuthenticated, function(req, res){
res.render('twitter', { user: req.user });
});

*/
//=========================================================================
// GOOGLE ==================================================================
// =========================================================================
passport.use(new GoogleTokenStrategy({

    clientID        : googleConfig.clientID,
    clientSecret    : googleConfig.clientSecret
},
function(accessToken, refreshToken, profile, done) {

    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(function() {
    	
    	
    	 console.log(profile.id);
	     console.log(profile.displayName);
	     console.log(profile.emails[0].value);
	     
		   new Model.User({username: profile.id}).fetch().then(function(data) {
			      var user = data;
			      if(user === null) {
			        // return done(null, false, {message: 'Profile not found'});		
			    	  var deferred = Q.defer();
			          var fbUser = new Model.User({username: profile.id, password: null});

			          fbUser.save().then(function(model) {
			        	  deferred.resolve(fbUser);
			          });	
			          
			          return done(null, deferred.promise);
			      } else {
			         user = data.toJSON();		
			         return done(null, user);			         
			      }
			   });

    	/*
        // try to find the user based on their google id
        User.findOne({ 'google.id' : profile.id }, function(err, user) {
            if (err)
                return done(err);

            if (user) {

                // if a user is found, log them in
                return done(null, user);
            } else {
                // if the user isnt in our database, create a new user
                var newUser          = new User();

                // set all of the relevant information
                newUser.google.id    = profile.id;
                newUser.google.token = token;
                newUser.google.name  = profile.displayName;
                newUser.google.email = profile.emails[0].value; // pull the first email

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
        
        */
    });

}));



/*
passport.use('twitter', new TwitterStrategy({
    consumerKey     : twitterConfig.apikey,
    consumerSecret  : twitterConfig.apisecret,
    callbackURL     : twitterConfig.callbackURL
  },
  function(token, tokenSecret, profile, done) {
	  
	  process.nextTick(function() { 
		  console.log(profile.id);
	  });
	  
  }));
*/
