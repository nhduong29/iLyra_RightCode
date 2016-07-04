angular
    .module('iLyra')
    .service('ItemServices', function($http,CommonServices){
        this.getItemsOfCustomer = function(customerID){
            return $http.get(CommonServices.urlString+'/customer/'+customerID+'/item');
        };

        this.getItemsOfNode = function(nodeID){
            return $http.get(CommonServices.urlString+'/node/'+nodeID+'/item');
        };

        this.getItem = function(itemID){
            return $http.get(CommonServices.urlString+'/item/'+itemID);
        };

        this.updateItem = function(item){
          return $http.put(CommonServices.urlString+'/item/'+item.itemID,item);
        };

        this.deleteItem = function(item){
            return $http({
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'},
                data: item,
                url:CommonServices.urlString+'/item/'+item.itemID
            });
        };

        this.getItems = function(){
            return $http.get(CommonServices.urlString+'/item')
        };

        this.addItem = function(item) {
            return $http.post(CommonServices.urlString+'/item',item);
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