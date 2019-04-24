
var app = angular.module('learningnode', ['ui.router','ngResource','ngMaterial']);
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider     

        // route for the home page
        .state('app', {
            url:'/home',
            views: {
                'header': {
                    templateUrl : 'include/header.html',
                    controller  : 'headercontroller'
                },
                'content': {
                    templateUrl : 'home/home.html',
                    controller  : 'maincontroller'
                }
            }
        })
        // route for the aboutus page
        .state('app.page1', {
            url:'page1',
            views: {
                'content@': {
                    templateUrl : 'about/aboutus.html',
                    controller  : 'aboutcontroller'               
                }
            }
        })
        .state('app.error', {
            url:'error',
            views: {
                'content@': {
                    templateUrl : 'error/404.html'          
                }
            }
        })
        .state('app.page3', {
            url:'page1',
            views: {
                'content@': {
                    templateUrl : 'queryBox/queryBox.html',
                    controller  : ''               
                }
            }
        });
        $urlRouterProvider.otherwise('/home');
        $locationProvider.html5Mode(true);
}]);
