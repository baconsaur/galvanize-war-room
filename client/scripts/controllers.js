angular.module('warRoom')
  .controller('OverviewController', OverviewController);

function OverviewController($scope, StatusService) {
  StatusService.on(function(data) {
    $scope.servers = data;
    $scope.$apply();
  });
}
