const mongoose = require('mongoose');
const Review = require('./review');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	  title : String,
	  price :String,
	  description :String,
	  images : [
	             {url:String,
                   public_id:String
	            }],
	  location: String,
	 coordinates :Array,
	  author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	   },
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review'
		}
	],
	avgRating :{   type: Number,  dafault : 0 }
});

postSchema.pre('remove', async function(){
     await Review.remove({
     	 _id :{
     	 	$in : this.reviews 
     	 }
     });
});

postSchema.methods.calculateAvgRating = function(){
	var totalRating = 0;
	if(this.reviews.length){
		 this.reviews.forEach((review) => {
          totalRating += review.rating ;
	 });
	     this.avgRating = Math.round((totalRating / this.reviews.length) * 10) / 10 ;
	 }else {
	 	this.avgRating = totalRating ;
	 }
	     const floorRating = Math.floor(this.avgRating);
          this.save();

          return floorRating ; 
};

postSchema.plugin(mongoosePaginate);


module.exports = mongoose.model("Post",postSchema);