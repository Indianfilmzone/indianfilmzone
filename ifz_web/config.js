var Bookshelf = require('bookshelf');

var config = {
   host: 'localhost',  // your host
   user: 'ifz_admin', // your database user
   password: 'Ifz@123', // your database password
   database: 'ifz_db',
   charset: 'UTF8_GENERAL_CI'
};

var DB = Bookshelf.initialize({
   client: 'mysql', 
   connection: config
});
//mysql exporter
module.exports.DB = DB;


//facebook app settings - fb.js
module.exports.FACEBOOK = {
  'appID' : '319937498027323',
  'appSecret' : 'bb0695196e1aba5cc3de65a4e2e0391b',
  'callbackUrl' : 'http://localhost:3000/login/facebook/callback'
};


module.exports.TWITTER = {
	    'apikey' : '<your_app_key>',
	    'apisecret' : '<you_app_secret>',
	    'callbackUrl' : 'http://127.0.0.1:3000/login/twitter/callback'
	};

module.exports.GOOGLE = {
	    'clientID' : '129321576133-kc4jnvqiku0oml592b84e23l961h07qv.apps.googleusercontent.com',
	    'clientSecret' : 'S8KB-dLO_zKE-LZohJMs0iHr',
	    'callbackURL' : 'http://127.0.0.1:3000/login/google/callback',
	    'realm': 'http://127.0.0.1:3000'
	};

