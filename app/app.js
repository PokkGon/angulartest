angular.module('miapp', ['ui.router','ui.bootstrap','ngLodash'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('Table', {
        url: '/',
        controller:'TableController',
        templateUrl:'app/views/table.html',
      })

    $urlRouterProvider.otherwise('/')
})