angular
    .module('iLyra')
    .service('CustomerServices', function($http,CommonServices){
        this.getCustomers = function(){
            return $http.get(CommonServices.urlString+'/customer/?size=1000&page=0&sort=name,asc');
        };

        this.getCustomer= function(customerID){
            return $http.get(CommonServices.urlString+'/customer/'+customerID);
        };

        this.deleteCustomer = function(customer){
            this.checkDefaultDataCustomer(customer);
            //return $http.delete('http://greenlightgv.dyndns.org:8080/customer/'+customer.customerID,customer);
            return $http({
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'},
                data: customer,
                url:CommonServices.urlString+'/customer/'+customer.customerID
            });
        };


        this.updateCustomer = function(customer){
            this.checkDefaultDataCustomer(customer);
            return $http.put(CommonServices.urlString+'/customer/'+customer.customerID,customer);
        };
        this.addCustomer = function(customer){
            this.checkDefaultDataCustomer(customer);
            return $http.post(CommonServices.urlString+'/customer/',customer);
        }

        this.getPaymentPlan = function() {
            return $http.get(CommonServices.urlString+'/plan')
        };

        //Other function


        this.checkDefaultDataCustomer = function(customer){
            if(customer && customer.account){
                customer.account.active = true;//Default value
                if(customer.account.role === null){
                    customer.account.paymentPlan = "Economic"; //Default value
                }
                if(customer.sex === 'male'){
                    customer.sex =  true;
                }else{
                    customer.sex = false;
                }
                if(customer.birthday === ''){
                    customer.birthday = null;
                }
                if(customer.phoneNumber === ''){
                    customer.phoneNumber = null;
                }
            }
            return customer;
        };

        this.failMessage = function(DOMElement,error){
            var box = $(DOMElement);
            $(DOMElement+' .title-error').html(error.error);
            $(DOMElement+' .mb-content .exception').html(error.exception);
            $(DOMElement+' .mb-content .message').html(error.message);
            box.toggleClass("open");
            var sound = box.data("sound");
            if(sound === 'fail') playAudio('fail');
        };
    });