angular.module('warRoom', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/');
      $stateProvider.state('overview', {
        templateUrl: 'templates/overview.html',
        controller: 'OverviewController',
        url: '/'
      }).state('details', {
        templateUrl: 'templates/details.html',
        controller: 'DetailsController',
        url: '/details/:id'
      }).state('settings', {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsController',
        url: '/settings'
      });
    });
