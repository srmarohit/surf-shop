const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name :'nodeimg' ,
	api_key : '757179596265731',
	api_secret : process.env.CLOUDINARY_SECRET
});

module.exports = {

	//get Post
	async getPosts(req,res,next){
		let posts = await Post.find({});
		res.render('post/index',{ posts });
	},
          
          // new Post
	newPost(req,res,next){
		res.render('post/new');
	},

	 //createPost
	 async createPost(req,res,next){
	 	//use req.body to create a new Post
	 	      req.body.post.images = [] ;
	 	       for(const file of req.files){
                  let image = await cloudinary.v2.uploader.upload(file.path);
                     req.body.post.images.push({
                  	    url : image.secure_url ,
                  	    public_id :image.public_id
                    });
	 	        }
            let post = await Post.create(req.body.post);
            res.redirect(`/posts/${post.id}`);
	 },

	  //showPost

	  async showPost(req,res,next){
	  	let post = await Post.findById(req.params.id);
	  	res.render('post/show',{post});
	  },

	   //editPost
	   async editPost(req,res,next){
	   	   let post = await Post.findById(req.params.id);
	   	   res.render('post/edit',{post});
	   },

	   //updatePost
	   async updatePost(req,res,next){
	   	  let post = await Post.findById(req.params.id);
	   	     if(req.body.deleteImages && req.body.deleteImages.length ){
	   	     	 let deleteImages = req.body.deleteImages ;
	   	     	  for(const public_id of deleteImages){
	   	     	  	   await cloudinary.v2.uploader.destroy(public_id);
	   	     	  	     for(const image of post.images){
	   	     	  	     	  if(image.public_id === public_id){
	   	     	  	     	  	let index = post.images.indexOf(image);
                                     post.images.splice(index,1);
	   	     	  	     	  }
	   	     	  	     }
	   	     	  }
	   	     }

	   	       if(req.files){
	   	       	   for(const file of req.files){
                        let image = await cloudinary.v2.uploader.upload(file.path);
                     post.images.push({
                  	    url : image.secure_url ,
                  	    public_id :image.public_id
                    });
	   	       	   }
	   	       }
              
               post.title = req.body.post.title ;
               post.price = req.body.post.price ;
               post.description = req.body.post.description;
               post.location = req.body.post.location ;

	   	       post.save();
	   	  res.redirect(`/posts/${post.id}`);
	   },

	          // Posts Destroy
	   async deletePost(req, res, next) {
		    let post =  await Post.findById(req.params.id);
		      for(const image of post.images){
                  await cloudinary.v2.uploader.destroy(image.public_id);                   
		      }
		     await post.remove(); 
		   res.redirect('/posts');
	} 
}