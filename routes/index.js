var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 
  if(req.session.views > 0){
        res.redirect("/login");}
   else{
   res.sendFile('inde1.html',{root: '/home/raghav/projects/trial/myapp/public'})
   }
});

module.exports = router;


// app.get('/dashboard', function(req, res) {
//   if (req.session && req.session.user) { // Check if session exists
//     // lookup the user in the DB by pulling their email from the session
//     User.findOne({ email: req.session.user.email }, function (err, user) {
//       if (!user) {
//         // if the user isn't found in the DB, reset the session info and
//         // redirect the user to the login page
//         req.session.reset();
//         res.redirect('/login');
//       } else {
//         // expose the user to the template
//         res.locals.user = user;

//         // render the dashboard page
//         res.render('dashboard.jade');
//       }
//     });
//   } else {
//     res.redirect('/login');
//   }
// });
