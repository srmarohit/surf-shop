const express = require('express');
const router = express.Router();
const {asyncErrorHandler,isLoggedIn,isAuthor} = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { getPosts,
	    newPost,
	    createPost,
	    showPost,
	    editPost,
	    updatePost,
	    deletePost
      } = require('../controllers/post');

/* GET Posts index /posts */
router.get('/', asyncErrorHandler(getPosts));

/* GET Posts new /posts/new */
router.get('/new',isLoggedIn, newPost);

/* POST Posts create /posts */
router.post('/', isLoggedIn, upload.array('images', 4), asyncErrorHandler(createPost));

/* GET Posts show /posts/:id */
router.get('/:id', asyncErrorHandler(showPost));

/* GET Posts edit /posts/:id/edit */
router.get('/:id/edit',isLoggedIn, asyncErrorHandler(isAuthor), asyncErrorHandler(editPost));

/* PUT Posts Update /posts/:id */
router.put('/:id',isLoggedIn, asyncErrorHandler(isAuthor), upload.array('images', 4), asyncErrorHandler(updatePost));

/* DELETE posts destroy /posts/:id */
router.delete('/:id',isLoggedIn, asyncErrorHandler(isAuthor), asyncErrorHandler(deletePost));

module.exports = router;
