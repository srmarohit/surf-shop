const express = require('express');
const router = express.Router();
const {postRegister,postLogin,getLogout} = require('../controllers/index');
const {asyncErrorHandler} = require('../middleware/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Post Index' });
});

/* GET Ragister page. */
router.get('/register', function(req, res, next) {
  res.send("Register /register");
});

/* POST Ragister page. */
router.post('/register',asyncErrorHandler(postRegister));

/* GET Login page. */
router.get('/login', function(req, res, next) {
  res.send("Login /login");
});


/* Post Login page. */
router.post('/login',postLogin);


/* GET Logout page. */
router.get('/logout',getLogout);

/* GET Profile page. */
router.get('/profile', function(req, res, next) {
  res.send("Get /profile");
});



/* Update Profile/profile_id page. */
router.put('/profile/:user_id', function(req, res, next) {
  res.send("put /profile/:user_id");
});



/* GET Forgot /forgot page. */
router.get('/forgot', function(req, res, next) {
  res.send("Get /forgot");
});


/* PUT Forgot page. */
router.put('/forgot', function(req, res, next) {
  res.send("Put /forgot");
});


/* GET Reset /reset/:token page. */
router.get('/reset/:token', function(req, res, next) {
  res.send("Get  /reset/:token");
});

/* put Reset /reset/:token page. */
router.put('/reset/:token', function(req, res, next) {
  res.send("Put /reset/:token");
});

module.exports = router;























