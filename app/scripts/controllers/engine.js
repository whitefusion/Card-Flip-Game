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
    let eg = this;
    this.moves = 0;
    this.stars = 3;

    this.stopWatch = 0;
    this.subWatch = 0;

    this.width = 4;
    this.height = 4;

    this.previousClick = -1;

    this.itemsCollection = ["fa-bomb","fa-bicycle","fa-cube",
    "fa-paper-plane-o","fa-leaf","fa-diamond",
    "fa-bolt","fa-anchor","fa-superpower",
    "fa-spoon","fa-plug","fa-legal",
    "fa-balance-scale","fa-bath","fa-birthday-cake",
    "fa-bug","fa-cog","fa-flighter-jet"];

    this.randCards = [];

    this.randItemStatus = {};

    this.randViewStatus = {};
    this.initialGame = function() {
        this.moves = 0;
        this.stopWatch = 0;
        this.randCards = [];
        this.previousClick = -1;
        this.randItemStatus = {};

        const numItems = this.width*this.height/2;
        let randTokens = randomPermute(this.itemsCollection.length);

        for (let i in randTokens.slice(0,numItems)){
            let temp = this.itemsCollection[i];
            this.randCards.push(temp);
            this.randCards.push(temp);
        }

        shuffle(this.randCards);

        for(let i = 0; i < this.randCards.length; i++){
            this.randItemStatus[i]='';
            this.randViewStatus[i]='hidden';
        }
    }

    this.cardClick = function(id) {
        if(this.randItemStatus[id] == 'match')
            return;

        this.moves+=1;
        eg.randItemStatus[id] = 'open';
        eg.randViewStatus[id] = '';

        // if match
        if(eg.previousClick!=-1 && eg.previousClick != id && (eg.randCards[eg.previousClick] == eg.randCards[id])){
            eg.randItemStatus[id] = 'match';
            eg.randItemStatus[eg.previousClick] = 'match';
            eg.previousClick = -1;
        } else { // if not match
            // if a previous click does not exist
            if(eg.previousClick== -1){
                eg.randItemStatus[id] = 'open';
                eg.randViewStatus[id] = '';
                eg.previousClick = id;
            }
            else { // if previous click exist
                eg.randItemStatus[eg.previousClick] = '';
                eg.randViewStatus[eg.previousClick] = 'hidden';
                eg.randItemStatus[id] = '';
                eg.randViewStatus[id] = 'hidden';
                eg.previousClick = -1;
            }
        }

    }

    this.initialGame();

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

    function wait(ms){
        var d = new Date();
        var d2 = null;
        do { d2 = new Date(); }
        while(d2-d < ms);
    }
  });

