app.controller("maincontroller",['$scope', '$filter' ,'$http','$mdSidenav', '$timeout', '$log', function($scope, $filter,$http, $mdSidenav, $timeout, $log) {
    $scope.user = {};
    $scope.student_list = [];
    $scope.params = {s_id: '', s_name: '', s_doj: '', batch_no: '',subject: ''};
    $scope.list = {show: false, student_show: false, batch_show: false, is_done: false}; 
    $scope.batch_list=[];   
    $scope.subject_list=[];
    $scope.volunteer_list=[];
    $scope.s1=0;
    $scope.show=false;
    $scope.show1=false;

    $scope.submitDate = function(){
        $scope.subject_list = [];
        $scope.batch_list = [];
        $scope.student_list = [];
        $scope.params.batch_id = '';
        $scope.params.subject_id = '';
        $scope.list = {show: false, student_show: false, batch_show: false};
        console.log($scope.user.submissionDate);
        $http.get('/user/batch/getallsubjectsfromday/' + $scope.user.submissionDate.getDay())
            .success(function(data){
                $scope.subject_list = data;
        })
            .error(function(data){
                console.log('Error: '+ data);
        });
    };

     $scope.get_batches=function(){
        console.log($scope.subject_selected);
         $http.get('/user/batch/getallbatches/'+$scope.subject_selected.trim())
                .success(function(data){
                    console.log(data);
                    $scope.batch_list = data;
            })
                .error(function(data){
                    console.log('Error: '+ data);
            });
            };

     $scope.getallsubjects = function(){
        $scope.s1=2;
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


    $scope.click = function(){
        $scope.student_list = [];
        $scope.params.s_id = '';
        $scope.params.s_name = '';
        $scope.s1=1;
        $scope.show=!$scope.show;
        $http.get('/user/student_info/'+$scope.subject_selected.trim()+'/'+$scope.batch_selected.trim())
            .success(function(data){
                console.log(data);
                $scope.student_list = data;
        })
            .error(function(data){
                console.log('Error: '+ data);
        });
    };


    $scope.volunteer = function(){
        $scope.volunteer_list = [];
        // $scope.params.s_id = '';
        // $scope.params.s_name = '';
        $scope.s1=1;
        $scope.show1=!$scope.show1;
        $http.get('/user/volunteer_info/'+$scope.subject_selected.trim())
            .success(function(data){
                console.log(data);
                $scope.volunteer_list = data;
        })
            .error(function(data){
                console.log('Error: '+ data);
        });
    };

    $scope.getAllBatches = function(){        
        $scope.list = {show: false, student_show: false, batch_show: true};
        $scope.batch_list = [];
        $scope.params.batch_id = '';
       // $scope.params.batch_disable = false;         
        $http.get('/user/batch/getallbatchlist/' + $scope.params.subject_id)
            .success(function(data){
                $scope.batch_list = data;
        })
            .error(function(data){
                console.log('Error: '+ data);
        });
    };

    $scope.callStudents = function(){
        $scope.list = {show: true, student_show: true, batch_show: true};
        if ($scope.params.batch_id !== ""){
            $http.get('/user/batch/getstudentsfrombatch/' + $scope.params.batch_id)
                .success(function(data){
                    $scope.student_list = data;
                    angular.forEach($scope.student_list, function(item, key){
                        item.is_attendance = item.is_attendance ? true : false; 
                    });
                    console.log($scope.student_list);
                    if ($scope.student_list.length > 0)
                    {
                        $scope.date_time = $filter('date')(new Date($scope.user.submissionDate),'fullDate');
                        $scope.details = {taken_on: $scope.date_time, batch_id: $scope.params.batch_id};
                        $http.get('/user/batch/getcountofattendance/' + $scope.params.batch_id + '/' + $scope.details.taken_on)
                            .success(function(data){
                                console.log(data);
                                if (data.length == 0){
                                    console.log($scope.details);
                                    $http.post('/user/learningnode/createattendance', $scope.details)
                                    .success(function(data){
                                        console.log(data);
                                        $scope.attendance_id = data.attendance_id;
                                    })
                                    .error(function(data){
                                        console.log('Error: '+ data);
                                    });
                                }
                                else
                                    $scope.attendance_id = data[0].attendance_id;
                                    //$scope.list.is_done = true;
                        })
                            .error(function(data){
                                console.log('Error: '+ data);
                        });                        
                    }
            })
                .error(function(data){
                    console.log('Error: '+ data);
            });            
        }
    };

    $scope.addAttendance = function(item, index){        
        item.attendance_id = $scope.attendance_id;        
        $scope.details_att = {student_id: item.student_id, attendance_id: $scope.attendance_id, is_attendance: item.is_attendance};
        console.log($scope.details_att);
        $http.post('/user/learningnode/markattendance', $scope.details_att)
            .success(function(data){
                if (data.length != 0)
                    $scope.student_list[index].is_done = true;
            })
            .error(function(data){
                console.log('Error: '+ data);
            });        
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
}]);