"use strict";angular.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}function c(a,c){var d=c;void 0===d&&(d=Math.min(b(a),3));var e=Math.pow(10,d);return{v:d,f:(a*e|0)%e}}var d={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"],FIRSTDAYOFWEEK:0,MONTH:["January","February","March","April","May","June","July","August","September","October","November","December"],SHORTDAY:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],SHORTMONTH:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],STANDALONEMONTH:["January","February","March","April","May","June","July","August","September","October","November","December"],WEEKENDRANGE:[5,6],fullDate:"EEEE, d MMMM y",longDate:"d MMMM y",medium:"d MMM y h:mm:ss a",mediumDate:"d MMM y",mediumTime:"h:mm:ss a",short:"dd/MM/y h:mm a",shortDate:"dd/MM/y",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"ZMW",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-¤",negSuf:"",posPre:"¤",posSuf:""}]},id:"en-zm",localeID:"en_ZM",pluralCat:function(a,b){var e=0|a,f=c(a,b);return 1==e&&0==f.v?d.ONE:d.OTHER}})}]);