const mongoose = require('mongoose');
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
	  lat:Number,
	  lng:Number,
	  author:{
	  	  type:Schema.Types.ObjectId,
	  	  ref:"user"
	  },
	  reviews:[
           {
           	type:Schema.Types.ObjectId,
           	ref:"review"
           }
	  ]
});

module.exports = mongoose.model("post",postSchema);