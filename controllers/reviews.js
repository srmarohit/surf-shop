
const Post = require('../models/post');
const Reviews = require('../models/review');

module.exports = {

	     async createReview(req,res,next){
	     	            // take post id ref.
              let post = await Post.findById(req.params.id).populate('reviews').exec();
                 // code for only one review per user allowed
                    let haveReviewed = post.reviews.filter(review => {
                         return review.author.equals(req.user._id);
                    }).length ;

                       if(haveReviewed){
                          req.session.error = "Sorry, you've already reviewed.." ;
                        return  res.redirect(`/posts/${post.id}`);
                       }
                    // user author
            req.body.review.author = req.user._id ;

                       // create review body
              let review = await Reviews.create(req.body.review);
              // store review in post reviews array .
              post.reviews.push(review);
              // update post
              post.save();
              //redirect to perticular post page.....
              req.session.success = "review create Successfully.." ;
              res.redirect(`/posts/${post.id}`);
	     },

	     async updateReview(req,res,next){
        await Reviews.findByIdAndUpdate(req.params.review_id, req.body.review);
              req.session.success = "review updated Successfully.." ;
              res.redirect(`/posts/${req.params.id}`);
	     } ,

	     async deleteReview(req,res,next){
            await Post.findByIdAndUpdate(req.params.id, {
              $pull : { reviews: req.params.review_id}
            });

            await Reviews.findByIdAndRemove(req.params.review_id);
             req.session.success = "review deleted Successfully.." ;
              res.redirect(`/posts/${req.params.id}`);
	     }      
}

