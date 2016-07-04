'use strict';

angular.module('Authentication')
    .controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService','AccountServices',
        function ($scope, $rootScope, $location, AuthenticationService, AccountServices) {
            // reset login status
            AuthenticationService.ClearCredentials();

            $scope.login = function () {
                $scope.dataLoading = true;
                AuthenticationService.Login($scope.username, $scope.password, function(response) {
                    if(response.success) {
                        AuthenticationService.SetCredentials($scope.username, $scope.password);

                        AccountServices.getAccount(response.accountID).success(function(data){
                            AuthenticationService.SetUserInfo(data);
                        }).error(function(error){
                            console.log(error);
                        })

                        $location.path('/');
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            };
        }]);