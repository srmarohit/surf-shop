var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport   = require('passport');
var session = require('express-session');

const User = require('./models/user');

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var reviewsRouter = require('./routes/reviews')

var app = express();

//Connect to the Database ...   mongoosejs.com/docs/index.html
 mongoose.connect(' mongodb+srv://srmarohit:forbidden@cluster0-8o8j7.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
    mongoose.connection.once('open', function(){
      console.log('Conection has been made!');
    }).on('error', function(error){
        console.log('Error is: ', error);
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//Configure passport and session...
    // github.com/expressjs/session   
app.use(session({          
   secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  }))


// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Mount Routes..
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews',reviewsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
