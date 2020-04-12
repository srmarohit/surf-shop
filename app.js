require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var engine = require('ejs-mate');
var mongoose = require('mongoose');
var path = require('path');
const favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport   = require('passport');
var session = require('express-session');

const User = require('./models/user');

// Seed fake postss.
//const seedPosts = require('./seedPost.js');
//seedPosts();

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var reviewsRouter = require('./routes/reviews');

var app = express();

//Connect to the Database ...   mongoosejs.com/docs/index.html
 mongoose.connect(' mongodb+srv://srmarohit:forbidden@cluster0-8o8j7.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
    mongoose.connection.once('open', function(){
      console.log('Conection has been made!');
    }).on('error', function(error){
        console.log('Error is: ', error);
    });


//set boilerplate engine 
app.engine('ejs',engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// set public assets directory
app.use(express.static('public'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));



//Configure passport and session...
    // github.com/expressjs/session   
app.use(session({          
   secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  }));
 app.use(passport.initialize());
  app.use(passport.session());


// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

      // apply middleware to use title of document..
app.use(function(req,res,next){

  //req.user = {
   // '_id':'5e7ce2d24523b921e1452abf',  //rohit
//       '_id':'5e81caa71c9d440000529d8e',  //rohite
  //  'username':'rohite'
 //};

 res.locals.currentUser = req.user ;
   res.locals.title = "Surf-Shop"; // set title  
          // Use Flash Message..
       res.locals.success = req.session.success || '';
       delete req.session.success;   
    
            // set flash Error message 
    res.locals.error = req.session.error || '';
       delete req.session.error ;  

    next();
});

// Mount Routes..
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews',reviewsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
       console.log(err);
       req.session.error = err.message ;
       res.redirect('back');   // goes to pre mount middleware to show flash message..

});

module.exports = app;
