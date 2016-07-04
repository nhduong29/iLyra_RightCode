angular
    .module('iLyra')
    .service('AccountServices', function($http,CommonServices){
        this.getAccount = function(accountID){
            return $http.get(CommonServices.urlString+'/account/'+accountID+'/detail');
        };
    });