var express = require('express');
var router = express.Router();
var passport = require('passport');
//load controllers


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Kuwait Classified Application',path : './' });
});

router.get('/login', function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('login', { 
	  title: 'Login',
	  message: req.flash('loginMessage'),
      path: './' 
	  });
});

// process the login form
 router.post('/login', passport.authenticate('local-login',{
	 successRedirect : '/profile', // redirect to the secure profile section
	 failureRedirect : '/login', // redirect back to the signup page if there is an error
	 failureFlash : true // allow flash messages
	 })
 );


// show the signup form
router.get('/signup', function(req, res) {
	// render the page and pass in any flash data if it exists
	res.render('signup.ejs', { 
		title:'Signup', 
		message: req.flash('signupMessage') 
		});
});


router.post('/signup',passport.authenticate('local-signup',{
	successRedirect : '/profile', // redirect to the secure profile section
	failureRedirect : '/signup', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));


// PROFILE SECTION we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile.ejs', {
		user : req.user, // get the user out of session and pass to template
        title: "Kuwait Classified App",
        path : './',
        pp: 'hello pp',
        urlPath : '/profile'
	});
});

//FACEBOOK ROUTES 
// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', { 
								scope : 'email' 
								}
					          )
);

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',passport.authenticate('facebook', {
									successRedirect : '/profile',
									failureRedirect : '/'
								       }
						          )
);


//Twitter Routes
// route for twitter authentication and login
router.get('/auth/twitter', passport.authenticate('twitter'));

// handle the callback after twitter has authenticated the user
router.get('/auth/twitter/callback',passport.authenticate('twitter',{
								   successRedirect : '/profile',
								   failureRedirect : '/' 
								 }
						      )
);


// LOGOUT 
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();
	
	// if they aren't redirect them to the home page
	res.redirect('/');
}


module.exports = router;
