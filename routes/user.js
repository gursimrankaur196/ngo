var express = require('express');
var router = express.Router();
var url = require('url');
var db = require('../db');


/*router.route('/')
.all(function(req,res,next) {
      res.sendFile('index.html', {root : __dirname + '/public'});
      next();
})*/
 //GET home page. 
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'NODE World', title1: 'Checking Title' });
  res.sendFile('index.html', {root : __dirname + '/public'});
});


//********************************************

router.get('/student_info/:sub/:batch', function(req,res,next){
  try{ 
   // db.getConnection(function(err, conn){
        var centre=req.session.centre;
        var sub=req.params.sub;
        var batch= req.params.batch;
        db.query("select s_id,s_name,s_doj, address,contact from student_info where center='"+centre+"' and subject like '%" + sub + "%' and " +sub+ "=" +batch+ ";", function(err, rows, fields){
          console.log('Count: '+ rows);
          var resEmp = [];
          for (var userIndex in rows){
          var userObj = rows[userIndex]; 
          resEmp.push(userObj);
          }
          return res.json(resEmp);
        });
     }
    catch(ex){
    console.log("Internal error: "+ex);
    return next(ex);
  }
});

//*********************************************************


router.get('/volunteer_info/:sub', function(req,res,next){
  try{ 
   // db.getConnection(function(err, conn){
        var centre=req.session.centre;
        var sub=req.params.sub;
       // var batch= req.params.batch;
        db.query("select * from volunteer_info where centre='"+centre+"' and subject like '%" + sub + "%' ;", function(err, rows, fields){
          console.log('Count: '+ rows);
          var resEmp = [];
          for (var userIndex in rows){
          var userObj = rows[userIndex]; 
          resEmp.push(userObj);
          }
          return res.json(resEmp);
        });
     }
    catch(ex){
    console.log("Internal error: "+ex);
    return next(ex);
  }
});

//********************************************************
router.get('/batch/getallsubjects', function(req, res, next){
  try{    
     var centre=req.session.centre;
    db.query('select subject_name from subject where centre="'+centre+'"' /*+ req.session.center*/, function(err, rows, fields){
          if(err){
            console.error('SQL Error: ', err);
            return next(err);            
          }
          var string=rows[0].subject_name;
          console.log(string);
          var resEmp = string.split(":");
            console.log(resEmp);
          res.json(resEmp);
        });
    }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});


// ****************************************************

router.get('/batch/getallbatches/:subject', function(req, res, next){
  try{    
     var centre=req.session.centre;
     console.log("entered");
     console.log(centre);
     var subject=req.params.subject;
    db.query('select number from total_batches where center="'+centre+'"and subject="' +subject+ '";' /*+ req.session.center*/, function(err, rows, fields){
          if(err){
            console.error('SQL Error: ', err);
            return next(err);            
          }
//           var i=0;
//           for (i = 0; i < rows[0].number; i++) {
//     text += i + ",";
// }

          // console.log(text);
           var resEmp = [];
          for (var i = 1; i <= rows[0].number; i++){
            //console.log("update" +table+ "set"+ userIndex+ ".total_attendance= total_attendance+1;")
          var userObj = i;
          resEmp.push(userObj);
          }
          console.log(resEmp);
          return res.json(resEmp);
        //   var string=rows[0].subject_name;
        //   console.log(string);
        //   var resEmp = string.split(":");
        //     console.log(resEmp);
        //   res.json(resEmp);
        });
    }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});














//*******************************************

router.get('/student_attendance/:subject/:batch', function(req,res,next){
  try{ 
    console.log("entered 2");
     var centre=req.session.centre;
     var batch=req.params.batch;
   // db.getConnection(function(err, conn)
      var sub = req.params.subject;
        console.log(sub);
        var centre=req.session.centre;
        var table = ""+centre+"_" +sub+"_student_att";     
        db.query("select student_info.s_name," +table+ ".* from student_info inner join " +table+ " on student_info.s_id=" +table+ ".s_id where student_info.subject like '%" + sub + "%' and " +table+ ".batch=" +batch+ ";" , function(err, rows, fields){
          console.log('Count: '+ rows);
          var resEmp = [];
          for (var userIndex in rows){
            //console.log("update" +table+ "set"+ userIndex+ ".total_attendance= total_attendance+1;")
          var userObj = rows[userIndex]; 
          resEmp.push(userObj);
          }
          return res.json(resEmp);
        }); 
     }
    catch(ex){
    console.log("Internal error: "+ex);
    return next(ex);
  }
});

//**********************************************

router.get('/volunteer_attendance/:subject', function(req,res,next){
  try{ 
    var centre=req.session.centre;
   // db.getConnection(function(err, conn)
      var sub = req.params.subject;
        console.log(sub);
        var table = ""+centre+"_" +sub+ "_volunteer_att";     
        db.query("select volunteer_info.v_name," +table+ ".* from volunteer_info inner join " +table+ " on volunteer_info.v_id=" +table+ ".v_id" , function(err, rows, fields){
          console.log("select volunteer_info.v_name," +table+ ".* from volunteer_info inner join " +table+ " on volunteer_info.v_id=" +table+ ".v_id")
          console.log('Count: '+ rows);
          var resEmp = [];
          for (var userIndex in rows){
          var userObj = rows[userIndex]; 
          resEmp.push(userObj);
          }
          return res.json(resEmp);
        }); 
     }
    catch(ex){
    console.log("Internal error: "+ex);
    return next(ex);
  }
});

//************************************************

router.get('/submit_student_attendance/:cbc/:sub', function(req,res,next){
  try{ 
        var centre=req.session.centre;
        var sub = req.params.sub;
        var cbc = req.params.cbc.split(",");
        var string ="('";
        for(var i=0; i<cbc.length-1;i++){
        string = string.concat(cbc[i]);
        string = string.concat("','"); 
        } 
        string = string.concat(cbc[i]);
        string = string.concat("')");
        var table = ""+centre+"_" +sub+ "_student_att"; 
        var date = new Date();
        date = date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate();

        db.query("show columns from "+table+" like '"+date+"'",function(err,rows,fields){         //to check if the today's date column already exists
          if(rows.length==0){
            console.log("today's date field doesn't exist");
            db.query("alter table "+table+" add " + date+ " varchar(5) default '0' AFTER batch");
          }
          else{
            console.log("today's date field exists");
          }
        

        db.query("update "+table+" set "+ date +" ='1',total_attendance = total_attendance+1 where "+date+" = '0' and s_id in "+string, function(err, rows, fields){  
        console.log('Count: '+ rows);
        return res.json(rows);
        }); 
      });
     }

        // db.query("alter table "+table+" add " + date+ " varchar(5) default '0'");    
        // console.log("update " +table+ " set total_attendance = total_attendance+1 where " +date+ " ='1'; ") ;          
        // db.query("update "+table+" set "+ date +" ='1' where s_id in "+string, function(err, rows, fields){  
        // db.query("update " +table+ " set total_attendance = total_attendance+1 where " +date+ " ='1'; ");
        // console.log('Count: '+ rows);
        // return res.json(rows);
        // }); 

    catch(ex){
    console.log("Internal error: "+ex);
    return next(ex);
  }
});



//************************************************

router.get('/submit_volunteer_attendance/:cbc/:sub', function(req,res,next){
  try{  
      if(req.session.access_right==0){
          return res.json("ACCESS DENIED");
        }
        var centre=req.session.centre;   
        var sub = req.params.sub; 
        var cbc = req.params.cbc.split(",");
        var string ="('";
        for(var i=0; i<cbc.length-1;i++){
        string = string.concat(cbc[i]);
        string = string.concat("','"); 
        }
        string = string.concat(cbc[i]);
        string = string.concat("')");
        var table = ""+centre+"_" +sub+ "_volunteer_att"; //
        var date = new Date();
        date = date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate();
        
        db.query("show columns from "+table+" like '"+date+"'",function(err,rows,fields){         //to check if the today's date column already exists
          if(rows.length==0){
            console.log("today's date field doesn't exist");
            db.query("alter table "+table+" add " + date+ " varchar(5) default '0' after batch");
          }
          else{
            console.log("today's date field exists");
          }
        
        db.query("update "+table+" set "+ date +" ='1',total_attendance = total_attendance+1 where "+date+" = '0' and v_id in "+string, function(err, rows, fields){  
        console.log('Count: '+ rows);
        return res.json(rows);
        }); 
      });
     }

    catch(ex){
    console.log("Internal error: "+ex);
    return next(ex);
  }
});




//************************************************




















router.post('/learningnode/createuser', function(req, res, next){
  try{
    var reqObj = req.body;
    console.log(reqObj);
    req.getConnection(function(err, conn){
      if (err)
      {
        console.error('SQL Connection error: ',err);
        return next(err);
      }
      else
      {
        var insertSql = "INSERT INTO user_master SET ?";
        var insertValues = {
          "user_name": reqObj.username,
          "password": reqObj.password
        };
        var query = conn.query(insertSql, insertValues, function(err, result){
          if(err){
            console.error('SQL Error: ', err);
            return next(err);            
          }
          console.log(result);
          var user_id = result.insertId;
          res.json({"User ID": user_id});
        });
      }
    });
  }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});

router.post('/learningnode/createattendance', function(req, res, next){
  try{
    var reqObj = req.body;
    console.log(reqObj);
    req.getConnection(function(err, conn){
      if (err)
      {
        console.error('SQL Connection error: ',err);
        return next(err);
      }
      else
      {
        var insertSql = "INSERT INTO rel_student_attendance SET ?";
        var insertValues = {
          "batch_id": reqObj.batch_id,
          "taken_on": reqObj.taken_on
        };
        var query = conn.query(insertSql, insertValues, function(err, result){
          if(err){
            console.error('SQL Error: ', err);
            return next(err);            
          }
          console.log(result);
          var attendance_id = result.insertId;
          res.json({"attendance_id": attendance_id});
        });
      }
    });
  }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});

router.post('/learningnode/markattendance', function(req, res, next){
  try{
    var reqObj = req.body;
    console.log(reqObj);
    req.getConnection(function(err, conn){
      if (err)
      {
        console.error('SQL Connection error: ',err);
        return next(err);
      }
      else
      {
        conn.query('select * from student_attendance_master where attendance_id = ? and student_id = ?',[reqObj.attendance_id, reqObj.student_id], function(err, rows, fields){
          if (rows.length > 0)
          {
            var query = conn.query('UPDATE student_attendance_master SET is_attendance = ? where attendance_id = ? and student_id = ?', [reqObj.is_attendance, reqObj.attendance_id, reqObj.student_id], function(err, result){
              if(err){
                console.error('SQL Error: ', err);
                res.json({"error": "Failed! Please try again later."});
                return next(err);            
              }
              console.log(result);
              //var id = result.insertId;
              res.json({"success": "Added successfuly"});
            });
          }
          else{
            var insertSql = "INSERT INTO student_attendance_master SET ?";
            var insertValues = {
              "attendance_id": reqObj.attendance_id,
              "student_id": reqObj.student_id,
              "is_attendance": reqObj.is_attendance
            };
            var query = conn.query(insertSql, insertValues, function(err, result){
              if(err){
                console.error('SQL Error: ', err);
                res.json({"error": "Failed! Please try again later."});
                return next(err);            
              }
              else{
                console.log(result);
                //var id = result.insertId;
                res.json({"success": "Added successfuly"});
              }              
            });
          }
        });        
      }
    });
  }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});

router.get('/batch/getcountofattendance/:batchId/:takenOn', function(req, res, next){
  try{
    var batchId = req.params.batchId;
    var takenOn = req.params.takenOn;
    console.log('Batch ID' + batchId);
    console.log('Taken' + takenOn);  
    req.getConnection(function(err, conn){
      if (err)
      {
        console.error('SQL Connection error: ',err);
        return next(err);
      }
      else
      {        
        conn.query('select * from rel_student_attendance where batch_id = ? and taken_on = ?',[batchId, takenOn], function(err, rows, fields){
          if(err){
            console.error('SQL Error: ', err);
            return next(err);            
          }
          console.log('Count: '+ rows);
          var resEmp = [];
          for (var userIndex in rows){
            var userObj = rows[userIndex];
            resEmp.push(userObj);
          }
          res.json(resEmp);
        });
      }
    });
  }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});


router.get('/batch/getallsubjectsfromday/:dayId', function(req, res, next){
  try{    
    var dayId = req.params.dayId;
    req.getConnection(function(err, conn){
      if (err)
      {
        console.error('SQL Connection error: ',err);
        return next(err);
      }
      else
      {
        conn.query('select rsc.subject_id, sm.subject_name from rel_subject_class rsc left join class_master cm on cm.class_id = rsc.class_id left join subject_master sm on sm.subject_id = rsc.subject_id where rsc.is_active = "Y" and cm.day_id = ?', [dayId], function(err, rows, fields){
          if(err){
            console.error('SQL Error: ', err);
            return next(err);            
          }
          var resEmp = [];
          for (var userIndex in rows){
            var userObj = rows[userIndex];
            resEmp.push(userObj);
          }
          res.json(resEmp);
        });
      }
    });
  }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});

router.get('/batch/getallbatchlist/:subjectId', function(req, res, next){
  try{    
    var subjectId = req.params.subjectId;
    req.getConnection(function(err, conn){
      if (err)
      {
        console.error('SQL Connection error: ',err);
        return next(err);
      }
      else
      {
        conn.query('select rsb.batch_id, bm.batch_name from rel_subject_batch rsb left join batch_master bm on rsb.batch_id = bm.batch_id where rsb.is_active = "Y" and rsb.subject_id = ?',[subjectId], function(err, rows, fields){
          if(err){
            console.error('SQL Error: ', err);
            return next(err);            
          }
          var resEmp = [];
          for (var userIndex in rows){
            var userObj = rows[userIndex];
            resEmp.push(userObj);
          }
          res.json(resEmp);
        });
      }
    });
  }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});

router.get('/batch/getallclasses/:subjectId', function(req, res, next){
  try{    
    var subjectId = req.params.subjectId;
    req.getConnection(function(err, conn){
      if (err)
      {
        console.error('SQL Connection error: ',err);
        return next(err);
      }
      else
      {
        conn.query('select cm.class_id, cm.class_day from class_master cm left join rel_subject_class rsc on cm.class_id = rsc.class_id where rsc.is_active = "Y" and rsc.subject_id = ?',[subjectId], function(err, rows, fields){
          if(err){
            console.error('SQL Error: ', err);
            return next(err);            
          }
          var resEmp = [];
          for (var userIndex in rows){
            var userObj = rows[userIndex];
            resEmp.push(userObj);
          }
          res.json(resEmp);
        });
      }
    });
  }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});

router.get('/batch/getstudentsfrombatch/:batchId', function(req, res, next){
  try{    
    var batchId = req.params.batchId;
    console.log(batchId);
    req.getConnection(function(err, conn){
      if (err)
      {
        console.error('SQL Connection error: ',err);
        return next(err);
      }
      else
      {
        conn.query('select sm.student_id, CONCAT(first_name," ",IFNULL(last_name,"")) as full_name, IFNULL(sam.is_attendance, false) as is_attendance, IFNULL(is_attendance, false) as is_done from student_master sm left join rel_student_batch sb on sm.student_id = sb.student_id left join student_attendance_master sam on sam.student_id = sm.student_id where sb.batch_id = ? and sm.is_active = "Y"', [batchId], function(err, rows, fields){
          if(err){
            var insertSql = "INSERT INTO error_log SET ?";
            var insertValues = {
              "description": err.code,
              "service_name": 'getstudentsfrombatch'
            };
            var query = conn.query(insertSql, insertValues, function(err, result){
            });
            console.error('SQL Error: ', err);
            return next(err);            
          }
          var resEmp = [];
          for (var userIndex in rows){
            var userObj = rows[userIndex];
            resEmp.push(userObj);
          }
          res.json(resEmp);
        });
      }
    });
  }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});

router.get('/learningnode/getalluserlist', function(req, res, next){
  try{    
    req.getConnection(function(err, conn){
      if (err)
      {
        console.error('SQL Connection error: ',err);
        return next(err);
      }
      else
      {
        conn.query('select * from user_master', function(err, rows, fields){
          if(err){
            console.error('SQL Error: ', err);
            return next(err);            
          }
          var resEmp = [];
          for (var userIndex in rows){
            var userObj = rows[userIndex];
            resEmp.push(userObj);
          }
          res.json(resEmp);
        });
      }
    });
  }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});

module.exports = router;