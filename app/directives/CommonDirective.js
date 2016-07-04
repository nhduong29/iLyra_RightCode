angular
    .module('iLyra')
        .directive('sliderBar', function(){
            return {
                restrict : 'E',
                templateUrl : 'app/templates/slider-bar.html'
            }
        })
        .directive('headerMenu', function(){
            return {
                restrict : 'E',
                templateUrl : 'app/templates/header-menu.html'
            }
        })
        .directive('tabs', function() {
            return {
                restrict: 'E',
                transclude: true,
                scope: {},
                controller: [ "$scope", function($scope) {
                    var panes = $scope.panes = [];

                    $scope.select = function(pane) {
                        angular.forEach(panes, function(pane) {
                            pane.selected = false;
                        });
                        pane.selected = true;
                    }

                    this.addPane = function(pane) {
                        if (panes.length == 0) $scope.select(pane);
                        panes.push(pane);
                    }
                }],
                templateUrl:'app/templates/tabs.html',
                replace: true
            };
        })
        .directive('pane', function() {
            return {
                require: '^tabs',
                restrict: 'E',
                transclude: true,
                scope: { name: '@' },
                link: function(scope, element, attrs, tabsCtrl) {
                    tabsCtrl.addPane(scope);
                },
                template:
                '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
                '</div>',
                replace: true
            };
        });