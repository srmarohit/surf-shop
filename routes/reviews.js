const express = require('express');
const router = express.Router({mergeParams: true});

  //    GET Reviews /posts/:id/reviews/ 
  router.get('/',(req,res,next)=>{
  	   res.send('index /post/:id/reviews');
  });

  //  Create Reviews /posts/:id/reviews/ 
  router.post('/',(req,res,next)=>{
  	   res.send('POST /post/:id/reviews');
  });


  //  Edit Reviews /posts/:id/reviews/:review_id/edit 
  router.get('/:review_id/edit',(req,res,next)=>{
  	   res.send('EDIT /post/:id/reviews/:review_id/edit');
  });


  //  Update Reviews /posts/:id/reviews/:review_id 
  router.put('/:review_id',(req,res,next)=>{
  	   res.send('UPDATE /post/:id/reviews/review_id');
  });


  //  Delete Reviews /posts/:id/reviews/:review_id 
  router.delete('/:review_id',(req,res,next)=>{
  	   res.send('Destroy /post/:id/reviews/:review_id');
  });

  module.exports = router;