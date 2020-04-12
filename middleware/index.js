const Review = require('../models/review');
const User = require('../models/user');
const Post = require('../models/post');
const { cloudinary } = require('../cloudinary');

const middleware = {
	
	 asyncErrorHandler :  (fn)=>
		(req,res,next)=>{
             Promise.resolve(fn(req,res,next))
             .catch(next);
		},

		isReviewAuthor : async (req,res,next)=> {
                let review = await Review.findById(req.params.review_id);
                  if(review.author.equals(req.user._id)){
                  	return next();
                  }
                    req.session.error = 'Bye Bye..' ;
                 return  res.redirect('/'); 
		},
 
                       // validation of aredy registrd email at registion form
		/*isUserExists : async (req,res,next)=>{
			 let userExists = await User.findOne({'email' : req.body.email});
			   if(userExists){
                  req.session.error = 'Enter email is already exists..!' ;
                  return res.redirect('back');
			   }
                 return next();
		}*/

      isLoggedIn : (req,res,next)=> {
      	       if(req.isAuthenticated()) return next();
      	       req.session.error="You need to log in to do that ";
      	       req.session.redirectTo = req.originalURL ;
      	        return res.redirect('/login');
      },

      isAuthor : async (req,res,next)=> {
             let post = await Post.findById(req.params.id);
                  if(post.author.equals(req.user._id)){
                    res.locals.post = post ;
                    return next();
                  }
                    req.session.error = 'Access Denied..' ;
                 return  res.redirect('back'); 
      },

      isValidPassword : async (req,res,next)=>{
         const {user} = await User.authenticate()(req.user.username,req.body.currentPassword);
           if(user){
              res.locals.user = user ;
              return next();
           }else{
                    middleware.deleteProfileImage(req);
              req.session.error = 'Incorrent Current Password';
              return res.redirect('/profile');
           }
      },

       changePassword : async (req,res,next)=>{
          const {newPassword, confirmPassword} = req.body ;

           if(newPassword && !confirmPassword){
                    middleware.deleteProfileImage(req);
             req.session.error = 'Missing Confirm Password !';
                   return res.redirect('/profile');
             }else 
              if(newPassword && confirmPassword){
                           const {user} = res.locals ;
                        if(newPassword === confirmPassword){
                          await user.setPassword(newPassword);
                           return next();
                         }else{
                                  middleware.deleteProfileImage(req);
                            req.session.error = 'Password must match !';
                              return res.redirect('/profile');
                         }
              }else{
                 return next();
             }
         },

      deleteProfileImage: async req => {
         if (req.file) await cloudinary.v2.uploader.destroy(req.file.public_id);
       }   
	};

  module.exports = middleware;
