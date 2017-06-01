const user = require('../../models/user')

//open registration form
exports.registration = (req,res) => {
  res.render('user/auth/registration.ejs',{ inputData: req.session.inputData });
}

//create new user
exports.store = (req, res) => {
  if(!validate(req.body, req.session)){
    req.session.inputData = req.body;
    return res.redirect('/auth/registration');
  }
  let userData = {
    name: req.body.name,
    password: req.body.password
  }
  user.store(userData, (err, doc) => {
    if (err){
      console.log(err);
    }
    req.session.user = doc;
    console.log(`Yeee, we logged now as ${doc.name}`);
    return res.redirect('/');
  })
}

//example of validate
function validate(data,session){
  this.data = data;
  this.isValid = true;
  session.errors = [];

  let process = () => {
    checkName();
    checkPassword();
    checkConfirmPassword();

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

  let checkConfirmPassword  = (data) => {
    if(this.data.password != this.data.passwordConfirm){
      console.log('Passwords do not match');
      session.errors.push('Passwords do not match');
      this.isValid = false;
    }
  }

  return process();

}
