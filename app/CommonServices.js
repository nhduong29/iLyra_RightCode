angular
    .module('iLyra')
    .service('CommonServices', function($rootScope){
       this.urlString = 'http://greenlightgv.dyndns.org:8080';
        $rootScope.showDateFromTimestamp = function(timestamp){
            return new Date(timestamp).toLocaleDateString();
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