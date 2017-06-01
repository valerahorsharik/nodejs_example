const user = require('../../models/user')

//display login form
exports.login = (req,res) => {
  req.session.errors = [];
  res.render('user/auth/login.ejs',{ inputData: req.session.inputData });
}

//trying to login with name and password
exports.tryToLogin = (req, res) => {
    user.findByNameAndPassword(req.body.name, req.body.password, (err,doc) => {
      if(err){
        console.log(err);
      }
      req.body.user = doc;

      if(!validate(req.body, req.session)){
        req.session.inputData = req.body;
        return res.redirect('/auth/login');
      }
      req.session.user = doc;
      console.log(`Yeee, we logged now as ${doc.name}`);
      res.redirect('/');
    })
  }

//logout
exports.logout = (req, res) => {
  req.session.user = undefined;
  res.redirect('/auth/login');
}
  //example of validate
function validate(data, session){
  this.data = data;
  this.isValid = true;
  session.errors = [];

  let process = () => {
    checkName();
    checkPassword();
    if (this.isValid) ifUserFound();
    return this.isValid;
  }

  let  checkName = () => {
    if(this.data.name.length < 3){
      console.log('Your name is too short');
      session.errors.push('Your name is too short');
      this.isValid = false;
    }
  }

  let checkPassword = () => {
    if(this.data.password.length < 3){
      console.log('Your password is too short');
      session.errors.push('Your password is too short');
      this.isValid = false;
    }
  }

  let ifUserFound = () => {
    if(this.data.user === null){
      console.log('We cant find user with that name and password');
      session.errors.push('We cant find user with that name and password');
      this.isValid = false;
    }
  }

  return process();

}
