const post = require('../models/post')

exports.index = (req,res) => {
  post.all((err,docs) => {
    if(err){
      console.log(err);
    }
      req.session.errors = [];
    if(docs.length === 0){
      req.session.errors = ['We dont have any posts yet! You can place the first one!']
    }
    res.render('index.ejs',{ posts:docs });
  })
}

exports.create = (req,res) => {
  res.render('posts/add.ejs');
}

exports.store = (req, res) => {
  post.store(req.body, (err, doc) => {
    if (err){
      return console.log(err);
    }
    res.redirect('/');
  })
}

exports.show = (req, res) => {
  post.findById(req.params.id,(err, doc) => {
    if (err){
      return console.log(err);
    }
    res.render('posts/show.ejs', { post:doc })
  })
}

exports.edit = (req,res) => {
  post.findById(req.params.id,(err,doc) => {
    if(err){
      return console.log(err);
    }
    res.render('posts/update-form.ejs',{ post:doc });
  })
}

exports.update = (req,res) => {
  post.update(req.params.id, req.body, (err,doc) => {
    if(err){
      return console.log(err);
    }
    res.redirect('/');
  })
}

exports.destroy = (req, res) => {
  post.deleteById( req.body.postId, (err, doc) => {
    if (err){
      return console.log(err);
    }
    res.redirect('/');
  })
}
