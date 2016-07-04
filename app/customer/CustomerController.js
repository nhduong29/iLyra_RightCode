
angular
    .module('Customer',['datatables'])
    .controller('CustomerController',function($scope,
                                              CommonServices,
                                              CustomerServices,
                                              NodeServices,
                                              ItemServices,
                                              DTOptionsBuilder,
                                              $location,
                                              $routeParams){

        //Menu
        $scope.menuSelected = 'customer';

        $scope.passwordPattern = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}";
        //$scope.phonePattern = "^[0-9]{10,}$";
        $scope.customers = [];
        $scope.pamentPlantType = [];
        defaultData =  function(){
            $scope.newCustomer = {};
            $scope.newCustomer.account = {};
            $scope.newCustomer.account.role = "USER";// Set default rule
            $scope.newCustomer.sex = true //Set default sex
            $scope.newCustomer.birthday = null //Set default sex
            $scope.newCustomer.paymentPlan = $scope.pamentPlantType[0];// set default payment plan
        };
        CustomerServices.getCustomers().success(function (data) {
            $scope.customers = data.content;
        }).error(function(error){
            console.log(error);
        });
        CustomerServices.getPaymentPlan().success(function (data) {
            $scope.pamentPlantType = data.content;
            $scope.newCustomer.paymentPlan = $scope.pamentPlantType[0];// set default payment plan
        }).error(function(error){
            console.log(error);
        });
        defaultData();
        $scope.addCustomer = function(newCustomer){
            CustomerServices.addCustomer(newCustomer).success(function (data) {
                $scope.customers.push(data);
                noty({text: 'Create User Successfully', layout: 'topRight',type: 'success'});
                $scope.clearForm();
                $('#new-customer-form').modal('hide');
            }).error(function(error){
                console.log(error);
                CustomerServices.failMessage('#message-box-sound-2',error);
            });
        };

        $scope.clearForm = function(){
            $scope.newCustomer = {};
            defaultData();
        };

        // function to submit the form after all validation has occurred
        $scope.addNewCustomer = function(isValid, customer) {
            if (isValid) {
                this.addCustomer(customer);
            }else{
                $scope.newCustomerForm.username.$invalid = true;
                $scope.newCustomerForm.username.$pristine = false;
            }

        };

        var customerID = ($routeParams.customerID) ? Number($routeParams.customerID) : -1;
        $scope.customer = {};
        $scope.nodes = [];
        $scope.items = [];
        if(customerID > 0){
            CustomerServices.getCustomer(customerID).success(function (data) {
                $scope.customer = data;
                //Get node of customer

                //$scope.customer.birthday = new Date($scope.customer.birthday).toLocaleDateString();
                //$('.datepicker').datepicker('setDate', new Date($scope.customer.birthday));
                $('#birthday').datepicker('setDate', new Date($scope.customer.birthday));
            }).error(function(error){
                console.log(error);
            });
            //Get node of customer
            NodeServices.getNodesOfCustomer(customerID).success(function(data){
                $scope.nodes = data.content;
            }).error(function(error){
                console.log(error);
            });

            //Get Item of customer
            ItemServices.getItemsOfCustomer(customerID).success(function(data){
                $scope.items = data.content;
            }).error(function(error){
                console.log(error);
            });
        }

        $scope.updateCustomer = function(customer){
            CustomerServices.updateCustomer(customer).success(function(data){
                $scope.customer = data;
                $('#birthday').datepicker('setDate', new Date($scope.customer.birthday));
                noty({text: 'Update Customer Successfully', layout: 'topRight',type: 'success',timeout: 5000});
            }).error(function(error){
                console.log(error);
            });
        };

        $scope.deleteCustomer = function(customer){

            if(confirm("Are you sure to delete customer number: "+$scope.customer.account.username)==true){
                $location.path('/customer');
                CustomerServices.deleteCustomer(customer).success(function(data){
                    noty({text: 'Delete Customer Successfully', layout: 'topRight',type: 'success'});
                }).error(function(error){
                    console.log(error);
                });
            }

        };



        //Other function

        $('#birthday').datepicker().on('changeDate', function(ev){
            $scope.newCustomer.birthday = $(ev.target).val();
            $scope.customer.birthday = $(ev.target).val();
            //$scope.$apply();
        });
    });