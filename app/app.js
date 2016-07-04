// declare modules
angular.module('Authentication', []);
angular.module('Dashboard', []);
angular.module('Customer', []);
angular.module('Node', []);
angular.module('Item', []);
angular.module('ItemType', []);
angular.module('Common', []);
angular.module('Account', []);
angular.module('Payment', []);
angular.module('Profile', []);
angular.module('CommonControl', []);
angular.module('iLyra',['ui.bootstrap','datatables','pascalprecht.translate',
    'Common',
    'CommonControl',
    'Authentication',
    'Dashboard',
    'Customer',
    'Node',
    'Item',
    'ItemType',
    'Payment',
    'Profile',
    'Account',
    'ngRoute',
    'ngCookies',
    'ngResource'])
    .config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'login.html',
            hideMenus: true
        })

        .when('/', {
            controller: 'DashboardController',
            templateUrl: 'dashboard.html'
        })

        .when('/customer', {
            controller: 'CustomerController',
            templateUrl: 'customers.html'
        })

        .when('/item', {
            controller: 'ItemController',
            templateUrl: 'items.html'
        })

        .when('/item-type', {
            controller: 'ItemTypeController',
            templateUrl: 'item-type.html'
        })

        .when('/node', {
            controller: 'NodeController',
            templateUrl: 'nodes.html'
        })

        .when('/payment', {
            controller: 'PaymentController',
            templateUrl: 'payment.html'
        })

        .when('/customer/edit/:customerID', {
            title: 'Edit Customer',
            templateUrl: 'customer-detail.html',
            controller: 'CustomerController',
            method: 'edit'
        })

        .when('/node/edit/:nodeID', {
            title: 'Edit Node',
            templateUrl: 'node-detail.html',
            controller: 'NodeController',
            method: 'edit'
        })

        .when('/item/edit/:itemID', {
            title: 'Edit Item',
            templateUrl: 'item-detail.html',
            controller: 'ItemController',
            method: 'edit'
        })

        .when('/item-type/edit/:typeID', {
            title: 'Edit Item Type',
            templateUrl: 'item-type-detail.html',
            controller: 'ItemTypeController',
            method: 'edit'
        })

        .when('/payment/edit/:planID', {
            controller: 'PaymentController',
            templateUrl: 'payment-detail.html'
        })

        .when('/profile', {
            controller: 'ProfileController',
            templateUrl: 'profile.html'
        })

        .otherwise({ redirectTo: '/login' });
}])

    .config(function($httpProvider) {
        $httpProvider.defaults.headers.delete = { 'Content-Type' : 'application/json' };
    })

    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore, $http) {
            // keep user logged in after page refresh
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                    $location.path('/login');
                }
            });
    }])

    .config(['$translateProvider', function ($translateProvider) {
        // add translation tables
        $translateProvider.translations('en', translationsEN);
        $translateProvider.translations('vi', translationsVI);
        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage('en');
        // Enable escaping of HTML
        $translateProvider.useSanitizeValueStrategy('escape');
    }]);
