const express = require('express');
const router = express.Router();

/* GET Posts index /posts */
router.get('/', function(req, res, next) {
  res.send('/posts');
});

/* GET Posts new /posts/new */
router.get('/new', function(req, res, next) {
  res.send(' /posts/new');
});

/* POST Posts create /posts */
router.post('/', function(req, res, next) {
  res.send('Create /posts');
});

/* GET Posts show /posts/:id */
router.get('/:id', function(req, res, next) {
  res.send('Show /posts/:id');
});

/* GET Posts edit /posts/:id/edit */
router.get('/:id/edit', function(req, res, next) {
  res.send('Edit /posts/:id/edit');
});

/* PUT Posts Update /posts/:id */
router.put('/:id', function(req, res, next) {
  res.send('Update /posts/:id');
});

/* Delete Posts destroy /posts/:id */
router.delete('/:id', function(req, res, next) {
  res.send('Delete /posts/:id');
});

module.exports = router;
