app.controller("headercontroller",['$scope', '$state', '$http', '$window','$mdSidenav', function($scope, $state, $http, $window, $mdSidenav) {
        $scope.currentNavItem = 'page1';
        // $scope.user=session.user;
    $scope.stateis = function(curstate) {        
       return $state.is(curstate);  
    };

    $scope.toggleSidenav = function () {
    console.log('toggleSidenav');
    $mdSidenav('nav').toggle();
    };

    $scope.logout = function(){
        var url = "http://localhost:3000/logout";
        console.log(url);
        $window.location.href = url;
    };  
  /*function sideNavController ($scope, $mdSidenav) {
        $scope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
        };
        $scope.openRightMenu = function() {
        $mdSidenav('right').toggle();
        };
    };*/  
}]);