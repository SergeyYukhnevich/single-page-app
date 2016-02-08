var controllers = angular.module('privateApp.controllers', []);

controllers.controller('HomeController', ['$scope', '$http', function ($scope, $http) {

    $scope.USER = window.USER;
    $scope.logout = function () {
        $http({
            method: 'POST',
            url: '/logout'
        }).then(function onSuccess(res) {
            window.location = '/login';
        }).catch(function onError(err) {
            console.error(err);
        });
    };

    $http.get('/users').then(function onSuccess(res) {
        $scope.users = res.data;
    }).catch(function onError(err) {
        console.error(err);
    });

}]);

controllers.controller('UsersController', ['$scope', '$http', function ($scope, $http) {

    $scope.USER = window.USER;
    $scope.logout = function () {
        $http({
            method: 'POST',
            url: '/logout'
        }).then(function onSuccess(res) {
            window.location = '/login';
        }).catch(function onError(err) {
            console.error(err);
        });
    };
    $scope.createUser = {
        loading: false,
        showAlert: false,
        toggleAlert: function () {
            $scope.createUser.showAlert = !$scope.createUser.showAlert;
        },
        data: {
            role: 'user'
        },
        submit: function () {
            $http.post('/users/create', {
                firstName: $scope.createUser.data.firstName,
                lastName: $scope.createUser.data.lastName,
                email: $scope.createUser.data.email,
                password: $scope.createUser.data.password,
                role: $scope.createUser.data.role
            }).then(function onSuccess(res) {
                window.location = '#/users';
            }).catch(function onError(err) {
                $scope.createUser.error = err.data;
                if (!$scope.createUser.showAlert) {
                    $scope.createUser.toggleAlert();
                }
            }).finally(function () {
                $scope.createUser.loading = false;
            });
        }
    };
    $scope.removeUser = function (id) {
        $http.post('/users/remove/' + id, { id: id }).then(function onSuccess(res) {
            if (id == $scope.USER.id) return $scope.logout();
            window.location = "#/users";
        }).catch(function onError(err) {
            console.error(err);
        });
    };

    $http.get('/users').then(function onSuccess(res) {
        $scope.users = res.data;
    }).catch(function onError(err) {
        console.error(err);
    });

}]);

controllers.controller('EditUserController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.editUser = {
        loading: false,
        showAlert: false,
        toggleAlert: function () {
            $scope.editUser.showAlert = !$scope.editUser.showAlert;
        },
        data: {},
        submit: function () {
            $http.post('/users/edit/' + $scope.editUser.data.id, {
                id: $scope.editUser.data.id,
                firstName: $scope.editUser.data.firstName,
                lastName: $scope.editUser.data.lastName,
                role: $scope.editUser.data.role
            }).then(function onSuccess(res) {
                window.location = '#/users';
            }).catch(function onError(err) {
                $scope.editUser.error = err.data;
                if (!$scope.editUser.showAlert) {
                    $scope.editUser.toggleAlert();
                }
            }).finally(function () {
                $scope.editUser.loading = false;
            });
        }
    };

    $http.get($location.$$path).then(function onSuccess(res) {
        $scope.editUser.data = res.data;
    }).catch(function onError(err) {
        console.error(err);
    });

}]);