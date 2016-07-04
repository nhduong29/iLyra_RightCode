angular
    .module('ItemType',['datatables'])
    .controller('ItemTypeController',
        function($scope,CommonServices,ItemTypeServices, DTOptionsBuilder,$location, $routeParams,$translate){
            //Menu
            $scope.menuSelected = 'item-type';
            $scope.itemTypes = [];
            $scope.itemType = {};

            //Get item type
            ItemTypeServices.getItemTypes().success(function(data){
                $scope.itemTypes = data.content;
            }).error(function(error){
                console.log(error);
            });

            //Get item type
            var typeID = ($routeParams.typeID) ? Number($routeParams.typeID) : -1;
            $scope.itemType = {};
            if(typeID > 0){
                ItemTypeServices.getItemType(typeID).success(function(data){
                    $scope.itemType = data;
                }).error(function(error){
                    console.log(error);
                });
            };

            //Add item type
            $scope.addItemType = function(isValid,itemType){
                if(isValid){
                    ItemTypeServices.addItemType(itemType).success(function (data) {
                        $scope.itemTypes.push(data);
                        noty({text: 'Create Item Type Successfully', layout: 'topRight',type: 'success'});
                        $('#new-item-type-form').modal('hide');
                    }).error(function(error){
                        console.log(error);
                        CommonServices.failMessage('#failNode',error);
                    });
                }else{
                    console.log("can not add item type");
                }

            };

            //Update item type
            $scope.updateItemType =function(itemType){
                ItemTypeServices.updateItemType(itemType).success(function(data){
                    $scope.itemType = data;
                    noty({text: 'Update Item Type Successfully', layout: 'topRight',type: 'success',timeout: 5000});
                }).error(function(error){
                    console.log(error);
                });
            };

            //Delete Item Type
            $scope.deleteItemType = function(itemType){
                if(confirm("Are you sure to delete item type: "+$scope.itemType.name)==true){

                    ItemTypeServices.deleteItemType(itemType).success(function(data){
                        $location.path('/item-type');
                        noty({text: 'Delete Item Type Successfully', layout: 'topRight',type: 'success'});
                    }).error(function(error){
                        console.log(error);
                    });
                }

            };


        });