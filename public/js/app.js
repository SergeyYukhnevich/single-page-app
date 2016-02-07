'use strict';

var app = angular.module('spa', ['ngRoute', 'SignupModule', 'LoginModule']);

angular.module('LoginModule', []);
angular.module('SignupModule', ['compareTo']);
angular.module('compareTo', []);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {

    });
}]);