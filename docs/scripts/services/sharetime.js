'use strict';

/**
 * @ngdoc service
 * @name memoGameApp.shareTime
 * @description
 * # shareTime
 * Service in the memoGameApp.
 */
angular.module('memoGameApp')
  .service('shareTime', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.formatTime = "00:00:00";
  });
