angular
    .module('CommonControl',[])
    .controller('CommonController',
    function($scope,CommonServices,$translate){
        $scope.languageName = "English";
        $scope.languageClass = "lang-eng";
        $scope.changeLanguage = function (langKey) {
            $('#lang-box').removeClass('active');
            if(langKey==='vi'){
                $scope.languageName = "Viet Nam";
                $scope.languageClass = "lang-vie";
            }else{
                $scope.languageName = "English";
                $scope.languageClass = "lang-eng";
            }
            $translate.use(langKey)
        };
    });