app.controller("aboutcontroller",['$scope', '$http','$mdSidenav', '$timeout', '$log', function($scope, $http, $mdSidenav, $timeout, $log) {
    $scope.user = {};
    $scope.student_list = [];
    $scope.volunteer_list = [];
    $scope.params = {batch_id: '', subject_id: '', class_id: '', batch_disable: true};
    $scope.list = {show: false, student_show: false};
    $scope.add_attendance = 0;
    $scope.tsunami=0;
    $scope.checkboxesChecked=[];
    $scope.s=0;
    $scope.s2=0;
    $scope.batch_list=[];
    // $scope.toggleVolunteerButton='false';
    // $scope.toggleStudentButton='false';
   // $scope.tables=[];

    $scope.init = function(){
        $http.get('/user/batch/getallsubjects/')
            .success(function(data){
        console.log(data);
                $scope.subject_list = data;
          //      console.log(subject_list);
        })
               .error(function(data){
                console.log('Error: '+ data);
        });
    };

    $scope.get_batches=function(){
         $http.get('/user/batch/getallbatches/' + $scope.subject_selected.trim())
                .success(function(data){
                    console.log(data);
                    $scope.batch_list = data;
            })
                .error(function(data){
                    console.log('Error: '+ data);
            });
            };

    $scope.get_student_attendance = function(){ 
        $scope.s=1;
        console.log($scope.batch_selected);
        console.log("undefined");
        $http.get('/user/student_attendance/' + $scope.subject_selected.trim()+"/"+ $scope.batch_selected)
                .success(function(data){
                    console.log(data);
                    $scope.student_list = data;
            })
                .error(function(data){
                    console.log('Error: '+ data);
            });
    };


    $scope.get_volunteer_attendance = function(){ 
       // $scope.tables = [];
       $scope.s2=1;
         var str="";
        $http.get('/user/volunteer_attendance/' + $scope.subject_selected.trim())
                .success(function(data){
                   // $scope.tables.push({rows: data, cols: Object.keys(data)});
                   //for i in 
                    console.log(data);
                    $scope.volunteer_list = data;
            })
                .error(function(data){
                    console.log('Error: '+ data);
            });
    };

    $scope.add_new_volunteer_col = function(){
        $scope.add_volunteer_attendance=1;
        console.log($scope.add_volunteer_attendance);
    };


    $scope.add_new_student_col = function(){
        $scope.add_student_attendance=1;
        console.log($scope.add_student_attendance);
     //   $http.get('/user/add_new_col/')
    };


    $scope.submit_student_attendance = function(check_student_attendance){
    console.log("yo babezz");
    var checkboxes = document.getElementsByName('check_student_attendance');
   // var checkboxesChecked = [];
    // loop over them all
    console.log(checkboxes.length);
    for (var i=0; i<checkboxes.length; i++) {
     // And stick the checked ones onto an array...
        if(checkboxes[i].checked) {
            $scope.checkboxesChecked.push(checkboxes[i].value);
            }
        }
  // Return the array if it is non-empty, or null
     // return checkboxesChecked.length > 0 ? checkboxesChecked : null;
        console.log($scope.checkboxesChecked);
        $http.get('/user/submit_student_attendance/'+ $scope.checkboxesChecked +"/"+ $scope.subject_selected.trim())
            .success(function(data){
                console.log("success");
                $scope.checkboxesChecked=[];
            })
            .error(function(data){
                console.log("error");
                $scope.checkboxesChecked=[];
            })
    };

    $scope.submit_volunteer_attendance = function(check_volunteer_attendance){
    console.log("yo babezz");
    var checkboxes = document.getElementsByName('check_volunteer_attendance');
   // var checkboxesChecked = [];
    // loop over them all
    console.log(checkboxes.length);
    for (var i=0; i<checkboxes.length; i++) {
     // And stick the checked ones onto an array...
        if(checkboxes[i].checked) {
            $scope.checkboxesChecked.push(checkboxes[i].value);
            }
        }
  // Return the array if it is non-empty, or null
     // return checkboxesChecked.length > 0 ? checkboxesChecked : null;
        console.log($scope.checkboxesChecked);
        $http.get('/user/submit_volunteer_attendance/'+ $scope.checkboxesChecked +"/"+ $scope.subject_selected.trim())
            .success(function(data){
                console.log(data);
                console.log("success");
                $scope.checkboxesChecked=[];
            })
            .error(function(data){
                console.log("error");
                $scope.checkboxesChecked=[];
            })
    };


    $scope.getAllBatches = function(){        
        $scope.list = {show: false, student_show: false};
        if ($scope.params.class_id !== ""){  
            $scope.params.batch_disable = false;         
            $http.get('/user/batch/getallbatchlist/' + $scope.params.class_id)
                .success(function(data){
                    $scope.batch_list = data;
            })
                .error(function(data){
                    console.log('Error: '+ data);
            });
        }        
    };

    // $scope.getAllSubjects = function(){
    //     $scope.params.batch_disable = true; 
    //     $scope.list = {show: false, student_show: false};
    //     $scope.batch_list = [];     
    //     console.log("sfgsref");
    //     $http.get('/user/batch/getallsubjects/' /*+ $scope.params.subject_id*/)
    //         .success(function(data){
    //             $scope.class_list = data;
    //     })
    //         .error(function(data){
    //             console.log('Error: '+ data);
    //     });
    // };

    $scope.callStudents = function(){
        $scope.list = {show: true, student_show: true};
        if ($scope.params.batch_id !== ""){
            $http.get('/user/batch/getstudentsfrombatch/' + $scope.params.batch_id)
                .success(function(data){
                    $scope.student_list = data;
                    /*angular.forEach($scope.student_list, function(value, key){
                        $scope.student_list.push({is_present: false});                        
                    });*/
                    console.log($scope.student_list);
            })
                .error(function(data){
                    console.log('Error: '+ data);
            });
        }
    };

    $scope.addAttendance = function(item){
        console.log(item);
        console.log($scope.user.attendance);
    };

    $scope.submit = function(){
        console.log($scope.user);
        $http.post('/user/learningnode/createuser', $scope.user)
            .success(function(data){
                $scope.init();
            })
            .error(function(data){
                console.log('Error: '+ data);
            });            
    };

    $scope.init();    
}]);