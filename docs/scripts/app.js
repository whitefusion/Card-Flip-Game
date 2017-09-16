'use strict';

/**
 * @ngdoc overview
 * @name memoGameApp
 * @description
 * # memoGameApp
 *
 * Main module of the application.
 */
var app = angular
  .module('memoGameApp', []);

angular.module('memoGameApp');

app.filter('range',function(){
    return function(val,range){
        range = parseInt(range);
        for(var i = 0; i<range; i++){
            val.push(i);
        }
        return val;
    };
});