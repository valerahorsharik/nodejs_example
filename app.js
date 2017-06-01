// import DB from './db';
// import lodash from 'lodash';
const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    app = express(),
    mongoClient = require('mongodb').MongoClient,
    objectID = require('mongodb').ObjectID,
    methodOverride = require('method-override'),
    postController = require('./controllers/post'),
    loginController = require('./controllers/auth/login'),
    registrationController = require('./controllers/auth/registration'),
    userController = require('./controllers/user');

let db = require('./db');


app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(session({
  name:'customSession',
  secret: '1q2w3e4r5t',
  resave: true,
  saveUninitialized: true
  // , cookie: { secure: true }
}))
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

//if user is guest we'll redirect him to /auth/login
app.use((req, res, next)=>{
  if(req.originalUrl.indexOf('/auth') === -1 || req.originalUrl.indexOf('/logout') != -1){
    if(typeof req.session.user == 'undefined'){
       res.redirect('/auth/login');
    } else {
      next()
    }
  } else {
    next()
  }
})

//if user is loginned he'll redirect away from /auth paths
app.use('/auth/:any', (req, res, next) => {
    if(typeof req.session.user != 'undefined'){
      if(req.originalUrl.indexOf('/logout') === -1){
        res.redirect('back');
      } else {
        next();
      }
    } else {
      next();
    }
})

app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  res.locals.errors = req.session.errors;
  next();
});


//post routes
app.get( '/' , postController.index);
app.get( '/post' , postController.create);
app.post( '/post' , postController.store);
app.get( '/post/update/:id', postController.edit);
app.put('/post/update/:id', postController.update);
app.get( '/post/:id' , postController.show);
app.delete( '/post/delete', postController.destroy);

//auth routes
app.get( '/auth/registration', registrationController.registration);
app.post( '/auth/registration', registrationController.store);
app.get( '/auth/login', loginController.login);
app.post( '/auth/login', loginController.tryToLogin);
app.get ( '/auth/logout', loginController.logout);


db.connect('mongodb://localhost:27017/test', function(err){
  if(err){
    return console.log(err);
  }

  app.listen(3000,function(){
    console.log("We are on :3000 ");
  })

})
