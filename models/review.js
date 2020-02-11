const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
	body :String,
	author:{
		type : Schema.Types,ObjectId,
		ref  :"user"
	}
});

module.exports = mongoose.model("review",reviewSchema);