const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email:String,
	image:String,
	posts:[
            {
            	type:Schema.Types.ObjectId,
            	 ref:"post"
            }
	]
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('user',userSchema);