angular.module('warRoom')
  .factory('StatusService', StatusService);

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
