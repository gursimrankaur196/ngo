var express = require('express');
var hash_login = require('./pass').hash_login;
var hash_register = require('./pass').hash_register;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var db = require('./db');

var router = express.Router();
var app = express();
app.use(express.static('public'))

var login = require('./routes/login');
var index = require('./routes/index');
var users = require('./routes/users');
var user = require('./routes/user');

// var mysql = require('mysql');
// var connection = require('express-myconnection');
// // Create SQL connection
// app.use(connection(mysql, {
//   host: "localhost",
//   user: "root",
//   password: "raghav",
//   database: "adhiyagya",
//   socketPath : '/var/run/mysqld/mysqld.sock'
// }, 'request'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
app.use(cookieParser('shhhh, very secret'));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));

app.use('/', index);
app.use('/login', login);
app.use('/users', users);
app.use('/user', user);

app.post('/register', function(req, res){
  console.log("ewkhjfkhwbfhfb   nwejkfcnjk    dwejdb wehj  dhyuewhe dh"+  req.body.doj);
hash_register(req.body.name, req.body.doj, req.body.email, req.body.address, req.body.contact, req.body.centre, req.body.subject, req.body.register_username, req.body.register_password, function(err, count){
if(err)
{
  console.log(err);
}
else{
  console.log(count);
  res.redirect("/");
}
});
});

app.post('/home', function(req, res){
    if(!req.body.login_username || !req.body.login_password){
    	console.log("enter data");
		res.redirect('/');
    }
      else
      {        
        db.query('SELECT v_salt,v_hash,centre,access_right FROM volunteer_info WHERE v_username = "' +req.body.login_username+ '";', function(err, rows, fields){
          if(rows.length==0){
            console.log("wrong username/password");
            return (new Error("invalid username"))
          }
          console.log('Count: '+ rows);
          
          var v_hash=rows[0].v_hash;
          var v_salt=rows[0].v_salt;

    hash_login(req.body.login_password, v_salt, function(err, hash){     
    console.log(hash);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
          if (err) return fn(err);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    if (hash.toString("hex") == v_hash){
       req.session.user=req.body.login_username;
                console.log(req.session.user);  
                req.session.views+=1;
                console.log(req.session.views);
                req.session.centre=rows[0].centre;
                console.log(req.session.centre);
                req.session.access_right=rows[0].access_right;
                //res.sendFile('login.html', {root : __dirname + '/public'});
                res.redirect("/login")
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    // fn(new Error('invalid password'));

            else{
              console.log(v_salt);
              console.log(v_hash);
              console.log(hash.toString("hex"));
            	console.log("kuchni");
        		res.redirect('/')
            }
        
    });
      
    });
  }
});

app.get('/logout', function(req, res, next) {
  console.log('Not');
  req.session=null;
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendFile('error/404.html', {root : __dirname + '/public'});
  //res.render('error');
});

module.exports = app;
