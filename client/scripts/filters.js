angular.module('warRoom')
  .filter('milliseconds', function() {
    return function(input) {
      return Math.floor(input * 1000) + 'ms';
    };
  });
