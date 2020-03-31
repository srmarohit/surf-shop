const Post = require('../models/post');
const cloudinary = require('cloudinary');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken:'pk.eyJ1IjoicmRzMTEwNyIsImEiOiJjazd1cmp0OGQwMGJ3M29xcTZvNXJzd2w1In0.rKfyvZxH0N038Um5D_-WJQ' });
  const request = require('request');


cloudinary.config({
	cloud_name :'nodeimg' ,
	api_key : '757179596265731',
	api_secret : process.env.CLOUDINARY_SECRET
});

module.exports = {

	//get Post
	async getPosts(req,res,next){
		let posts = await Post.paginate({},{
			page : req.query.page || 1,
			limit : 10 
		});
		posts.page = Number(posts.page);
		res.render('post/index',{ posts, title: 'Posts Index' });
	},
          
          // new Post
	newPost(req,res,next){
		res.render('post/new');
	},

	 //createPost
	 async createPost(req,res,next){
	 	//use req.body to create a new Post
	 	      req.body.post.images = [] ;
	 	      req.body.post.coordinates = [] ;

	 	       for(const file of req.files){
                  let image = await cloudinary.v2.uploader.upload(file.path);
                     req.body.post.images.push({
                  	    url : image.secure_url ,
                  	    public_id :image.public_id
                    });
	 	        }

          let response = await geocodingClient
		  .forwardGeocode({
		    query: req.body.post.location,
		    limit: 1
		  })
		  .send();
		req.body.post.coordinates = response.body.features[0].geometry.coordinates;

                 console.log( req.body.post.coordinates[0]);
            let post = await Post.create(req.body.post);
            req.session.success = "Post created Successfully..!";
            res.redirect(`/posts/${post.id}`);
	 },

	  //showPost

	  async showPost(req,res,next){
	  	let post = await Post.findById(req.params.id).populate({
	  		path :'reviews',
	  		options :{sort : {'_id':-1} },
             populate :{
             	         path:'author',
             	          model:'User'
                     }
	  			 });

	  	 const avgFloorRating = post.calculateAvgRating(); 
	  	let mapBoxToken = 'pk.eyJ1IjoicmRzMTEwNyIsImEiOiJjazd1cmp0OGQwMGJ3M29xcTZvNXJzd2w1In0.rKfyvZxH0N038Um5D_-WJQ';
		res.render('post/show', { post, mapBoxToken, avgFloorRating });// pass avgfloorRating as local variable..
             
	  	//res.render('post/show',{post});
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
              
      if(req.body.post.location !== post.location ){
             let response = await geocodingClient.forwardGeocode({
		        query: req.body.post.location,
		         limit: 1
		          }).send();

	    	      post.coordinates = response.body.features[0].geometry.coordinates;
                  post.location = req.body.post.location ;

         }

               post.title = req.body.post.title ;
               post.price = req.body.post.price ;
               post.description = req.body.post.description;

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
		     		req.session.success = 'Post deleted successfully!';
		   res.redirect('/posts');
	} 
}