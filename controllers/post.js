const Post = require('../models/post');
const { cloudinary } = require('../cloudinary');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken:'pk.eyJ1IjoicmRzMTEwNyIsImEiOiJjazd1cmp0OGQwMGJ3M29xcTZvNXJzd2w1In0.rKfyvZxH0N038Um5D_-WJQ' });
  const request = require('request');


module.exports = {

	//get Post
	async getPosts(req,res,next){
		let posts = await Post.paginate({},{
			page : req.query.page || 1,
			limit : 10 ,
			sort : {_id:'-1'}       // latest posts show first.. -1 is for desc.
		});
		posts.page = Number(posts.page);
		res.render('post/index',{ posts, 
			MapboxToken:process.env.MAPBOX_TOKEN,
			title: 'Posts Index' 
		});
	},
          
          // new Post
	newPost(req,res,next){
		res.render('post/new');
	},

	 //createPost
	 async createPost(req,res,next){
	 	//use req.body to create a new Post
	 	      req.body.post.images = [] ;
	 	     // req.body.post.coordinates = [] ;

	 	       for(const file of req.files){
                     req.body.post.images.push({
                  	    url : file.secure_url ,
                  	    public_id :file.public_id
                    });
	 	        }

          let response = await geocodingClient
		  .forwardGeocode({
		    query: req.body.post.location,
		    limit: 1
		  })
		  .send();
		req.body.post.geometry = response.body.features[0].geometry;
		    req.body.post.author = req.user._id ;  // set user id to author

                // console.log( req.body.post.coordinates[0]);
            let post = await Post.create(req.body.post);
            post.properties.description = `<strong><a href='/posts/${post.id}'>
                         ${post.title}
                         </a></strong>
                         <p>${post.location}</p>
                         <p>${post.description.substring(0,20)}....</p>`;
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
	   	//   let post = await Post.findById(req.params.id); // no needed due store post in res.locals.post
	   	   res.render('post/edit');
	   },

	   //updatePost
	   async updatePost(req,res,next){
	   	 //  let post = await Post.findById(req.params.id);
	   	 //take post from destucturing res.locals 
	   	 const {post} = res.locals ;
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
                     post.images.push({
                  	    url : file.secure_url ,
                  	    public_id :file.public_id
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

                post.properties.description = `<strong><a href='/posts/${post.id}'>
                         ${post.title}
                         </a></strong>
                         <p>${post.location}</p>
                         <p>${post.description.substring(0,20)}...</p>` ;

	   	     await post.save();
	   	  res.redirect(`/posts/${post.id}`);
	   },

	          // Posts Destroy
	   async deletePost(req, res, next) {
		    //let post =  await Post.findById(req.params.id);
		    	   	 const {post} = res.locals ; // By destructuring res.locals 
		      for(const image of post.images){
                  await cloudinary.v2.uploader.destroy(image.public_id);                   
		      }
		     await post.remove(); 
		     		req.session.success = 'Post deleted successfully!';
		   res.redirect('/posts');
	} 
}