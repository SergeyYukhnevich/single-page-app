angular.module('SignupModule').controller('SignupController', ['$scope', '$http', function($scope, $http){

    // set-up loading state
    $scope.signupForm = {
        loading: false
    };

    $scope.submitSignupForm = function () {

        // Set the loading state (i.e. show loading spinner)
        $scope.signupForm.loading = true;

        // Submit request to Sails.
        $http.post('/signup', {
            firstName: $scope.signupForm.firstName,
            lastName: $scope.signupForm.lastName,
            email: $scope.signupForm.email,
            password: $scope.signupForm.password
        }).then(function onSuccess(res){
            window.location = '/';
        }).catch(function onError(err){

            // Handle known error type(s).
            // If using sails-disk adpater -- Handle Duplicate Key
            var emailAddressAlreadyInUse = err.status == 409;

        }).finally(function eitherWay(){
            $scope.signupForm.loading = false;
        });
    };

}]);