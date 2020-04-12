const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const {landingPage,
	getRegister,
	postRegister,
	getLogin,
	postLogin,
	getLogout,
  getProfile,
  updateProfile,
  getForgotPw,
  putForgotPw,
  getResetPw,
  putResetPw } = require('../controllers/index');
  
const {asyncErrorHandler,isLoggedIn,isValidPassword,changePassword} = require('../middleware/index');

/* GET home page. */
router.get('/', asyncErrorHandler(landingPage));

/* GET Ragister page. */
router.get('/register', getRegister);

/* POST Ragister page. */
router.post('/register', upload.single('image'), asyncErrorHandler(postRegister));

/* GET Login page. */
router.get('/login',getLogin);


/* Post Login page. */
router.post('/login',asyncErrorHandler(postLogin));


/* GET Logout page. */
router.get('/logout',getLogout);

/* GET Profile page. */
router.get('/profile', isLoggedIn, asyncErrorHandler(getProfile));



/* Update Profile/profile_id page. */
router.put('/profile',
  isLoggedIn,
  upload.single('image'),
  asyncErrorHandler(isValidPassword),
  asyncErrorHandler(changePassword),
  asyncErrorHandler(updateProfile) );



/* GET Forgot /forgot page. */
router.get('/forgot-password',getForgotPw);


/* PUT Forgot page. */
router.put('/forgot-password',asyncErrorHandler(putForgotPw));


/* GET Reset /reset/:token page. */
router.get('/reset/:token',asyncErrorHandler(getResetPw));

/* put Reset /reset/:token page. */
router.put('/reset/:token',asyncErrorHandler(putResetPw));

module.exports = router;























