'use strict';

/**
 * @ngdoc function
 * @name memoGameApp.controller:EngineJsCtrl
 * @description
 * # EngineJsCtrl
 * Controller of the memoGameApp
 */
angular.module('memoGameApp')
  .controller('EngineCtrl', ['shareTime','dateFilter',function(st,dateFilter) {

    /*
     *****
     * Property Definition
     *****
     */

    this.itemsCollection = ["fa-rocket","fa-puzzle-piece","fa-cube",
    "fa-hand-lizard-o","fa-trophy","fa-stethoscope",
    "fa-shield","fa-eur","fa-beer",
    "fa-spoon","fa-plug","fa-legal",
    "fa-balance-scale","fa-hourglass","fa-birthday-cake",
    "fa-bug","fa-cog","fa-fighter-jet"];

    let eg = this;
    this.moves = 0;
    this.stars = 3;

    this.begin = 0;
    this.width = 4;
    this.height = 4;

    this.previousClick = -1;
    this.previousPair = new Array(-1,-1);
    this.matchCount = 0;
    this.end = false;

    this.randCards = [];

    this.randItemStatus = {};

    this.randViewStatus = {};

    /*
     *****
     * Initial/Reset Game
     *****
     */

    this.initialGame = function() {

        this.moves = 0;
        this.begin = 0;
        this.randCards = [];

        this.previousClick = -1;
        this.previousPair = [-1,-1];

        this.randItemStatus = {};
        this.matchCount = 0;
        this.end = false;

        const numItems = this.width*this.height/2;
        let randTokens = randomPermute(this.itemsCollection.length);

        randTokens.slice(0,numItems).forEach((i)=>{

            let temp = this.itemsCollection[i];

            this.randCards.push(temp);
            this.randCards.push(temp);
        })

        shuffle(this.randCards);

        for(let i = 0; i < this.randCards.length; i++){
            this.randItemStatus[i]='';
            this.randViewStatus[i]='hidden';
        }
    }

    this.initialGame();

    /*
     *****
     * Method for handling events when clicking a card
     *****
     */

    this.cardClick = (id) => {
        if(eg.randItemStatus[id] == 'match' || eg.previousClick == id)
            return;

        eg.moves+=1;

        if(eg.moves == 1){
            this.begin = new Date().getTime();
        }

        checkStatus(id);
        updateStatus(id);

        if(eg.matchCount == eg.randCards.length/2){
            eg.end = true;
            eg.begin = 0;
        }

    }

    this.getTime =()=> {
        if(this.begin)
            return st.formatTime;
        else
            return "00:00:00";
    }
    this.setFalse =()=> eg.end = false;

    function checkStatus(id){
        if(eg.previousPair[0]!=-1 && eg.randItemStatus[eg.previousPair[0]] == 'rollBack'){
            eg.randItemStatus[eg.previousPair[0]]='';
            eg.randViewStatus[eg.previousPair[0]]='hidden';

            eg.randItemStatus[eg.previousPair[1]]='';
            eg.randViewStatus[eg.previousPair[1]]='hidden';
        }
    }

    function updateStatus(id){
        // if match
        if(eg.previousClick!=-1 && eg.previousClick != id && (eg.randCards[eg.previousClick] == eg.randCards[id])){
            eg.matchCount+=1;

            eg.randItemStatus[id] = 'match';
            eg.randViewStatus[id] = 'fadeIn';

            eg.randItemStatus[eg.previousClick] = 'match';
            eg.randViewStatus[eg.previousClick] = 'fadeIn';
            eg.previousClick = -1;
        } else { // if not match
            // if a previous click does not exist
            if(eg.previousClick == -1){
                eg.randItemStatus[id] = 'flipUp';
                eg.randViewStatus[id] = 'fadeIn';
                eg.previousClick = id;
            }
            else { // if previous click exist
                eg.randItemStatus[eg.previousClick] = 'rollBack';
                eg.randViewStatus[eg.previousClick] = 'fadeOut';

                eg.randItemStatus[id] = 'rollBack';
                eg.randViewStatus[id] = 'fadeOut';

                eg.previousPair[0] = eg.previousClick;
                eg.previousPair[1] = id;
                eg.previousClick = -1;

            }
        }
    }
}])
.directive('timer',['$interval','dateFilter', 'shareTime',
    function($interval, dateFilter,st){
        return function(scope, element, attrs) {
            let begin,
            stopTime;

            function updateTime(){
                if(begin){
                    let curr = new Date().getTime();
                    let dist = curr - begin;
                    let hour = Math.floor((dist%(1000*60*60*24))/(1000*60*60)).toString();
                    let minute = Math.floor((dist%(1000*60*60))/(1000*60)).toString();
                    let second = Math.floor((dist%(1000*60))/1000).toString();
                    st.formatTime = `${hour.length==1?"0"+hour:hour}:${minute.length==1?"0"+minute:minute}:${second.length==1?"0"+second:second}`;
                    element.text(st.formatTime);
                }
            }

            scope.$watch(attrs.timer, function(value){
                begin = value;
            });

            stopTime = $interval(updateTime,1000);

            element.on('$destroy',function(){
                $interval.cancel(stopTime);
            });
        }
    }
]);



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


// class StopWatch {
//     constructor() {
//         this.running = false;
//         this.formatTime='00:00:00';
//     }

//     reset() {
//         this.running = false;
//         this.formatTime = '00:00:00';
//     }

//     returnTime(){
//         return this.formatTime;
//     }

//     start() {
//         this.running =true;
//         let begin = new Date().getTime();

//         setInterval(function(){
//             if(this.running){
//                 let curr = new Date().getTime();
//                 console.log(curr);
//                 let dist = curr-now;
//                 let hour = Math.floor((dist%(1000*60*60*24))/(1000*60*60));
//                 let minute = Math.floor((dist%(1000*60*60))/(1000*60));
//                 let second = Math.floor((dist%(1000*60))/1000);
//                 this.formatTime = `${hour}:${minute}:${second}`;
//             }
//         },1000);
//     }

//     stop() {
//         this.running = false;
//     }

// }

