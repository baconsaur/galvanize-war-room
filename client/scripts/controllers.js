angular.module('warRoom')
  .controller('OverviewController', OverviewController)
  .controller('DetailsController', DetailsController);

function OverviewController($scope, StatusService) {
  StatusService.on(function(data) {
    $scope.servers = data;
    $scope.$apply();
  });
}
function DetailsController($scope, $stateParams, StatusService) {
  StatusService.on(function(data) {
    $scope.server = data[$stateParams.id];
    //   .find(function(server){
    //     return server.id === $stateParams.id;
    // });
    $scope.$apply();
  });
}
