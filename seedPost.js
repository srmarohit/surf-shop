const faker = require('faker');
const Post = require('./models/post');

     async function seedPosts(){
     	await Post.remove({});
     	for(const i of new Array(40)){
     		 let post = {
     		 	title : faker.lorem.word(),
     		 	description:faker.lorem.text(),
     		 	author :{
     		 		 '_id':'5e7ce2d24523b921e1452abf',
                     'username':'rohit'
     		 	}
     		 };

     		 await Post.create(post);
     	}

     	console.log("40  fake data post inserted....")

     }

     module.exports = seedPosts ;