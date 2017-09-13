'use strict';

/**
 * @ngdoc function
 * @name memoGameApp.controller:EngineJsCtrl
 * @description
 * # EngineJsCtrl
 * Controller of the memoGameApp
 */
angular.module('memoGameApp')
  .controller('EngineCtrl', function () {
    this.moves = 0;
    this.stars = 3;
    this.stopWatch = 0;
    this.subWatch = 0;
    this.width = 4;
    this.height = 4;

    this.items = ["fa-bomb","fa-bicycle","fa-cube",
    "fa-paper-plane-o","fa-leaf","fa-diamond",
    "fa-bolt","fa-anchor","fa-superpower",
    "fa-spoon","fa-plug","fa-legal",
    "fa-balance-scale","fa-bath","fa-birthday-cake",
    "fa-bug","fa-cog","fa-flighter-jet"];

    this.randItems = {};

    this.initialGame = function() {
        this.stopWatch = 0;

        const numItems = this.width*this.height/2;
        let randTokens = randomPermute(this.items.length);

        for (i in randTokens.slice(0,numItems))
            this.randItems[this.items[i]]=false;
    }

    function shuffle(o) {
        for(let j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
    }

    function randomPermute(n) {
        let idList = [];
        for(let i = 0; i < n; i++)
            idList.push(i);
        shuffle(idList);
        return idList;
    }
  });
