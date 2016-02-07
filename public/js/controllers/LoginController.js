angular.module('LoginModule').controller('LoginController', ['$scope', '$http', function($scope, $http){

    // set-up loading state
    $scope.loginForm = {
        loading: false
    };

    $scope.submitLoginForm = function () {

        // Set the loading state (i.e. show loading spinner)
        $scope.loginForm.loading = true;

        // Submit request to Sails.
        $http.post('/login', {
            email: $scope.loginForm.email,
            password: $scope.loginForm.password
        }).then(function onSuccess(res){
            window.location = '/';
        }).catch(function onError(err){

            // Handle known error type(s).
            // If using sails-disk adpater -- Handle Duplicate Key
            var emailAddressAlreadyInUse = err.status == 409;

        }).finally(function eitherWay(){
            $scope.loginForm.loading = false;
        });
    };

}]);