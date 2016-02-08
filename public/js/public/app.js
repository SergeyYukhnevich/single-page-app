'use strict';

var publicApp = angular.module('publicApp', ['ngRoute', 'SignupModule', 'LoginModule']);

angular.module('LoginModule', []);
angular.module('SignupModule', ['compareTo']);
angular.module('compareTo', []);

publicApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: function () {
                return 'partials/login.html';
            },
            controller: 'LoginController'
        })
        .when('/signup', {
            templateUrl: function () {
                return 'partials/signup.html';
            },
            controller: 'SignupController'
        })
        .otherwise({
            redirectTo: '/'
        });

}]);