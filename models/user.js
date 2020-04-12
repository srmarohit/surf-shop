const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email:{ type: String, unique: true, required: true },
	image:{
		secure_url:{
				type:String,
	            default:'/images/default-profile.png'
	        },
	     public_id:String   
	   },
	resetPasswordToken : String,
	tokenExpires:Date
	
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',userSchema);