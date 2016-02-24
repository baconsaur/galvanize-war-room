angular.module('warRoom')
  .factory('StatusService', StatusService)
  .factory('SettingsService', SettingsService);

function StatusService () {
  var socket = io();
  var callbacks = [];
  socket.on('status', function (data) {
    callbacks.forEach(function (callback) {
      callback(data.body.data);
    });
  });
  return {
    on: function (callback) {
      callbacks.push(callback);
    }
  };
}

function SettingsService () {
  var warning = localStorage.getItem("warning") || 50;
  var critical = localStorage.getItem("critical") || 500;

  return {
    getThresholds: function () {
      return {
        warning: parseInt(warning),
        critical: parseInt(critical)
      };
    },
    setThresholds: function (settings) {
      warning = settings.warning;
      localStorage.setItem("warning", warning);
      critical = settings.critical;
      localStorage.setItem("critical", critical);
    }
  };
}
