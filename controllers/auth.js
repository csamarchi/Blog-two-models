const express = require('express');
const router  = express.Router();
const User    = require('../models/user');
const bcrypt  = require('bcrypt');



 router.get('/login', (req, res) => {
  console.log(req.session)
  // ON EVERY SINGLE ROUTE IN THE WHOLE ENTIRE APPLICATION
  // you have attached to req a new property called session
  res.render('auth/login.ejs', {
    message: req.session.message
  });
});


 router.post('/register', async (req, res) => {

//first thing we are going to do is store our password in variable
const password = req.body.password;
//create our hash
const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
console.log(passwordHash);

//Create an object to put into our database into the User Model
const userEntry = {};
userEntry.username = req.body.username;
userEntry.password = passwordHash;

const user = await User.create(userEntry);
console.log(user);

   // initializing the session here
  req.session.username = req.body.username;
  req.session.logged   = true;
  req.session.message  = '';
  res.redirect('/authors');
});

router.post('/login', (req, res) => {

  bcrypt.compareSync('the forms password', 'this is the password from database');
  

  res.redirect('/authors')
})




 router.get('/logout', (req, res) => {
  // this basically restarts the session
  // and clears out all the properties that we set
  // on the session object
  req.session.destroy((err) => {
    if(err){
      res.send(err);
    } else {
      res.redirect('/auth/login')
    }
  });
});
 module.exports = router;
