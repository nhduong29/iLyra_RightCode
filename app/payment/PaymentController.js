angular
    .module('Payment')
    .controller('PaymentController',
        function($scope,CommonServices,PaymentServices,$location,$route, $routeParams){
            //Menu
            $scope.menuSelected = 'payment';
            $scope.payments = [];
            $scope.payment = {};

            //Get all payments
            PaymentServices.getPayments().success(function(data){
                $scope.payments = data.content;
            }).error(function(error){
                console.log(error);
            });


            $scope.addPayment = function(isValid, payment){
                if(isValid){
                    PaymentServices.addPayment(payment).success(function (data) {
                        $scope.payments.push(data);
                        noty({text: 'Create Payment Plan Successfully', layout: 'topRight',type: 'success'});
                        $scope.payment ={};
                        $('#new-payment-form').modal('hide');
                    }).error(function(error){
                        console.log(error);
                        CommonServices.failMessage('#failNode',error);
                    });
                }else{
                    console.log("can not add pament plan");
                }
            };

            //Get payment
            var plantID = ($routeParams.plantID) ? Number($routeParams.plantID) : -1;
            if(plantID > 0){
                PaymentServices.getPayment(plantID).success(function(data){
                    $scope.payment = data;
                }).error(function(error){
                    console.log(error);
                });
            }


            //Delete Node
            $scope.deletePayment = function(payment){
                if(confirm("Are you sure to delete payment paln: "+payment.name)==true){
                    $route.reload();
                    PaymentServices.deletePayment(payment).success(function(data){
                        noty({text: 'Delete Payment Plan Successfully', layout: 'topRight',type: 'success'});
                    }).error(function(error){
                        console.log(error);
                    });
                }

            };


        });