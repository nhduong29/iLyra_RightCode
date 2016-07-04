angular
    .module('Item',['datatables'])
    .controller('ItemController',
        function($scope,CommonServices,ItemServices,ItemTypeServices,CustomerServices,NodeServices, DTOptionsBuilder,$location, $routeParams){
            //Menu
            $scope.menuSelected = 'item';

            $scope.items = [];
            $scope.nodes = [];
            $scope.itemTypes = [];

            $scope.getItemsOfCustomer = function(customerID){
                ItemServices.getItemsOfCustomer(customerID).success(function(data){
                    $scope.items = data.content;
                }).error(function(error){
                    console.log(error);
                });
            };

            //Get All Item

            ItemServices.getItems().success(function(data){
                $scope.items = data.content;
            }).error(function(error){
                console.log(error);
            });

            //Get all node
            NodeServices.getNodes().success(function(data){
                $scope.nodes = data.content;
            }).error(function(error){
                console.log(error);
            });

            //get all itemType
            ItemTypeServices.getItemTypes().success(function(data){
                $scope.itemTypes = data.content;
            }).error(function(error){
                console.log(error);
            });

            //Get item
            var itemID = ($routeParams.itemID) ? Number($routeParams.itemID) : -1;
            $scope.item = {};
            if(itemID > 0){
                ItemServices.getItem(itemID).success(function(data){
                    $scope.item = data;
                }).error(function(error){
                    console.log(error);
                });
            };

            //Add item
            $scope.addItem = function(isValid,item){
                if(isValid){
                    ItemServices.addItem(item).success(function (data) {
                        $scope.items.push(data);
                        noty({text: 'Create Item Successfully', layout: 'topRight',type: 'success'});
                        $('#new-item-form').modal('hide');
                    }).error(function(error){
                        console.log(error);
                        CommonServices.failMessage('#failNode',error);
                    });
                }else{
                    console.log("can not add item");
                }

            };

            //Update item
            $scope.updateItem =function(item){
                ItemServices.updateItem(item).success(function(data){
                    $scope.item = data;
                    noty({text: 'Update Item Successfully', layout: 'topRight',type: 'success',timeout: 5000});
                }).error(function(error){
                    console.log(error);
                });
            };

            //Delete Item
            $scope.deleteItem = function(item){
                if(confirm("Are you sure to delete item: "+$scope.item.name)==true){
                    $location.path('/item');
                    ItemServices.deleteItem(item).success(function(data){
                        noty({text: 'Delete Item Successfully', layout: 'topRight',type: 'success'});
                    }).error(function(error){
                        console.log(error);
                    });
                }

            };


        });