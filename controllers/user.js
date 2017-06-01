const use = require('../models/user')


exports.create = (req,res) => {
  res.render('user/registration.ejs');
}

exports.store = (req, res) => {
  post.store(req.body, (err, doc) => {
    if (err){
      console.log(err);
    }
    res.redirect('/');
  })
}

exports.edit = (req,res) => {
  post.findById(req.params.id,(err,doc) => {
    if(err){
      console.log(err);
    }
    res.render('user/update-form.ejs',{ post:doc });
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
