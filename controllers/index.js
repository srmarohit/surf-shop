const user = require("../models/user");
const passport = require('passport');

module.exports = {

	// postRegister 
  async	postRegister(req,res,next){
           const newUser = new user(
           	{
           		username: req.body.username,
           		email   : req.body.email,
           		image   :req.body.image
           	  }
           	);

             await user.register(newUser,req.body.password); 

               console.log('user registered!');

             res.redirect('/');
     }	,

       //postLogin
       postLogin(req,res,next){
			passport.authenticate('local',
                { 
                   successRedirect: '/', 
                   failureRedirect: '/login'
                 }
            )(req,res,next);
		 },

		 //getLogout
		 getLogout(req,res,next){
		 	  req.logout();
              res.redirect('/');
		 }
 }

