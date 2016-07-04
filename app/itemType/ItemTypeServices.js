angular
    .module('iLyra')
    .service('ItemTypeServices', function($http,CommonServices){
        this.getItemTypes = function(){
            return $http.get(CommonServices.urlString+'/itemType');
        };

        this.getItemType = function(typeID){
            return $http.get(CommonServices.urlString+'/itemType/'+typeID);
        };

        this.updateItemType = function(itemType){
            return $http.put(CommonServices.urlString+'/itemType/'+itemType.typeID,itemType);
        };

        this.addItemType = function(itemType) {
            return $http.post(CommonServices.urlString+'/itemType',itemType);
        };

        this.deleteItemType = function(itemType){
            return $http({
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'},
                data: itemType,
                url: CommonServices.urlString+'/itemType/'+itemType.typeID
            });
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