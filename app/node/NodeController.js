angular
    .module('Node',['datatables'])
    .controller('NodeController',function($scope,
                                          CommonServices,
                                          NodeServices,
                                          ItemServices,
                                          CustomerServices,
                                          DTOptionsBuilder,
                                          $location,
                                          $routeParams){

        //Menu
        $scope.menuSelected = 'node';
        $scope.nodes = [];
        $scope.customers = [];
        $scope.items = [];

        CustomerServices.getCustomers().success(function (data) {
            $scope.customers = data.content;
        }).error(function(error){
            console.log(error);
        });

       /* $scope.getNodesOfCustomer = function(customerID){
            NodeServices.getNodesOfCustomer(customerID).success(function(data){
                $scope.nodes = data.content;
            }).error(function(error){
                console.log(error);
            });
        };*/


        NodeServices.getNodes().success(function(data){
            $scope.nodes = data.content;
        }).error(function(error){
            console.log(error);
        });

        $scope.addNode = function(isValid,node){
            if(isValid){
                NodeServices.addNode(node).success(function (data) {
                    $scope.nodes.push(data);
                    noty({text: 'Create Node Successfully', layout: 'topRight',type: 'success'});
                    $('#new-node-form').modal('hide');
                }).error(function(error){
                    console.log(error);
                    CommonServices.failMessage('#failNode',error);
                });
            }else{
                console.log("can not add node");
            }

        };


        //Get node
        var nodeID = ($routeParams.nodeID) ? Number($routeParams.nodeID) : -1;
        $scope.node = {};
        $scope.items = [];
        if(nodeID > 0){
            NodeServices.getNode(nodeID).success(function(data){
                $scope.node = data;
                $('#createdDate').datepicker('setDate', new Date($scope.node.createdDate));
            }).error(function(error){
                console.log(error);
            });

            //Get all item of node
            ItemServices.getItemsOfNode(nodeID).success(function (data) {
                $scope.items = data.content;
            }).error(function(error){
                console.log(error);
            });
        }

        //Update node
        $scope.updateNode =function(node){
            NodeServices.updateNode(node).success(function(data){
                $scope.node = data;
                $('#createdDate').datepicker('setDate', new Date($scope.node.createdDate));
                noty({text: 'Update Node Successfully', layout: 'topRight',type: 'success',timeout: 5000});
            }).error(function(error){
                console.log(error);
            });
        };

        //Delete Node
        $scope.deleteNode = function(node){
            if(confirm("Are you sure to delete node: "+$scope.node.name)==true){
                $location.path('/node');
                NodeServices.deleteNode(node).success(function(data){
                    noty({text: 'Delete Node Successfully', layout: 'topRight',type: 'success'});
                }).error(function(error){
                    console.log(error);
                });
            }

        };

        //other function
        $('#createdDate').datepicker().on('changeDate', function(ev){
            $scope.node.createdDate = $(ev.target).val();
        });
    });