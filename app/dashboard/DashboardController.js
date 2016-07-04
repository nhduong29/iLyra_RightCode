/**
 * Created by DuongHanh on 6/12/2016.
 */
'use strict';
angular.module('Dashboard')
    .controller('DashboardController',function ($scope,DashboardService) {
        //Menu
        $scope.menuSelected = 'dashboard';

        $scope.totalCustomer = DashboardService.totalCustomer();
        $scope.totalNode = DashboardService.totalNode();
        $scope.totalItem = DashboardService.totalItem();

    });