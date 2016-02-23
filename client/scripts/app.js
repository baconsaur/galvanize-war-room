angular.module('warRoom', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/');
      $stateProvider.state('overview', {
        templateUrl: 'templates/overview.html',
        controller: 'OverviewController',
        url: '/'
      });
    });
