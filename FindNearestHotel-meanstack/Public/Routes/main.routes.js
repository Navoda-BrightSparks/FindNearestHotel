'use strict';

angular.module('HotelApp').config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'Pages/home.html',
            controller: 'MainController'
        }).otherwise({
            redirectTo: '/home'
        });
        $locationProvider.html5Mode(true);
    }]);