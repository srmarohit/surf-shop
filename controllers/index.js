const user = require("../models/user");

module.exports = {
	postRegister(req,res,next){
           const newUser = new user(
           	{
           		username: req.body.username,
           		email   : req.body.email,
           		image   :req.body.image
           	  }
           	);
  user.register(newUser, req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });	
   }
}