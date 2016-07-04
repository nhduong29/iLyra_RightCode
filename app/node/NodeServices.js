angular
    .module('iLyra')
    .service('NodeServices', function($http,CommonServices){
        this.getNodesOfCustomer = function(customerID){
            return $http.get(CommonServices.urlString+'/customer/'+customerID+'/node');
        };

        this.getNodes = function(){
            return $http.get(CommonServices.urlString+'/node');
        };

        this.getNode = function(nodeID){
            return $http.get(CommonServices.urlString+'/node/'+nodeID);
        };

        this.updateNode = function(node){
            return $http.put(CommonServices.urlString+'/node/'+node.nodeID,node);
        };

        this.deleteNode = function(node){
            return $http({
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'},
                data: node,
                url:CommonServices.urlString+'/node/'+node.nodeID
            });
        };

        this.addNode = function(node) {
            return $http.post(CommonServices.urlString+'/node/',node);
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