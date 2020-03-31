const express = require('express');
const router = express.Router({mergeParams: true});
const {asyncErrorHandler, isReviewAuthor} = require('../middleware');
const {
  createReview,
updateReview,
deleteReview
} = require('../controllers/reviews');

  //  Create Reviews /posts/:id/reviews/ 
  router.post('/', asyncErrorHandler(createReview));


  //  Update Reviews /posts/:id/reviews/:review_id 
  router.put('/:review_id', isReviewAuthor, asyncErrorHandler(updateReview));


  //  Delete Reviews /posts/:id/reviews/:review_id 
  router.delete('/:review_id', isReviewAuthor, asyncErrorHandler(deleteReview));

  module.exports = router;