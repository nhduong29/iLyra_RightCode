angular
    .module('iLyra')
    .service('PaymentServices', function($http,CommonServices){
        this.getPayments = function(){
            return $http.get(CommonServices.urlString+'/plan');
        };

        this.getPayment = function(plantID){
            return $http.get(CommonServices.urlString+'/plan/'+plantID);
        };

        this.addPayment = function(payment){
            return $http.post(CommonServices.urlString+'/plan',payment);
        };

        this.deletePayment = function(payment){
            return $http({
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'},
                data: payment,
                url:CommonServices.urlString+'/plan/'+payment.planID
            });
        };


    });