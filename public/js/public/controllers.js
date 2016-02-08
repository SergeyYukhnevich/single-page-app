angular.module('SignupModule').controller('SignupController', ['$scope', '$http', function ($scope, $http) {

    $scope.signupForm = {
        loading: false
    };

    $scope.showAlert = false;
    $scope.toggleAlert = function () {
        $scope.showAlert = !$scope.showAlert;
    };

    $scope.submitSignupForm = function () {

        $scope.signupForm.loading = true;

        $http.post('/signup', {
            firstName: $scope.signupForm.firstName,
            lastName: $scope.signupForm.lastName,
            email: $scope.signupForm.email,
            password: $scope.signupForm.password
        }).then(function onSuccess(res) {
            window.location = '/';
        }).catch(function onError(err) {
            $scope.signupForm.error = err.data;
            if (!$scope.showAlert) {
                $scope.toggleAlert();
            }
        }).finally(function () {
            $scope.signupForm.loading = false;
        });
    };

}]);

angular.module('LoginModule').controller('LoginController', ['$scope', '$http', function ($scope, $http) {

    $scope.loginForm = {
        loading: false
    };

    $scope.showAlert = false;
    $scope.toggleAlert = function () {
        $scope.showAlert = !$scope.showAlert;
    };

    $scope.submitLoginForm = function () {

        $scope.loginForm.loading = true;

        $http.post('/login', {
            email: $scope.loginForm.email,
            password: $scope.loginForm.password
        }).then(function onSuccess(res) {
            window.location = '/';
        }).catch(function onError(err) {
            $scope.loginForm.error = err.data;
            if (!$scope.showAlert) {
                $scope.toggleAlert();
            }
        }).finally(function () {
            $scope.loginForm.loading = false;
        });
    };

}]);