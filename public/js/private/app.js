'use strict';

var privateApp = angular.module('privateApp', ['ngRoute', 'privateApp.controllers']);

privateApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: function () {
                return 'partials/home.html';
            },
            controller: 'HomeController'
        })
        .when('/users', {
            templateUrl: function () {
                return 'partials/users.html'
            },
            controller: 'UsersController'
        })
        .when('/users/create', {
            templateUrl: function () {
                return 'partials/create-user.html'
            },
            controller: 'UsersController'
        })
        .when('/users/edit/:id', {
            templateUrl: function () {
                return 'partials/edit-user.html'
            },
            controller: 'EditUserController'
        })
        .otherwise({
            redirectTo: '/'
        });

}]);