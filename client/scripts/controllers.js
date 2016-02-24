angular.module('warRoom')
  .controller('OverviewController', OverviewController)
  .controller('DetailsController', DetailsController)
  .controller('SettingsController', SettingsController);

function OverviewController($scope, StatusService, SettingsService) {
  StatusService.on(function(data) {
    $scope.servers = data;
    $scope.$apply();
  });
  $scope.warning = SettingsService.getThresholds().warning;
  $scope.critical = SettingsService.getThresholds().critical;
}
function DetailsController($scope, $stateParams, StatusService, SettingsService) {
  StatusService.on(function(data) {
    $scope.server = data[$stateParams.id];
    $scope.$apply();
  });
  $scope.warning = SettingsService.getThresholds().warning;
  $scope.critical = SettingsService.getThresholds().critical;
}
function SettingsController($scope, SettingsService) {
  $scope.warning = SettingsService.getThresholds().warning;
  $scope.critical = SettingsService.getThresholds().critical;

  $scope.$watch('warning', function() {
    SettingsService.setThresholds({
      warning: $scope.warning,
      critical: $scope.critical
    });
  });

  $scope.$watch('critical', function() {
    SettingsService.setThresholds({
      warning: $scope.warning,
      critical: $scope.critical
    });
  });
}
