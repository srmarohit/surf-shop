const express = require('express');
const router = express.Router();
const {asyncErrorHandler} = require('../middleware');
const multer = require('multer');
const upload = multer({'dest':'uploads/'});
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
router.get('/new', newPost);

/* POST Posts create /posts */
router.post('/', upload.array('images', 4), asyncErrorHandler(createPost));

/* GET Posts show /posts/:id */
router.get('/:id', asyncErrorHandler(showPost));

/* GET Posts edit /posts/:id/edit */
router.get('/:id/edit', asyncErrorHandler(editPost));

/* PUT Posts Update /posts/:id */
router.put('/:id', upload.array('images', 4), asyncErrorHandler(updatePost));

/* DELETE posts destroy /posts/:id */
router.delete('/:id', asyncErrorHandler(deletePost));

module.exports = router;
