"use strict";angular.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}function c(a,c){var d=c;void 0===d&&(d=Math.min(b(a),3));var e=Math.pow(10,d);return{v:d,f:(a*e|0)%e}}var d={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["atm","ptm"],DAY:["dimanĉo","lundo","mardo","merkredo","ĵaŭdo","vendredo","sabato"],ERANAMES:["aK","pK"],ERAS:["aK","pK"],FIRSTDAYOFWEEK:0,MONTH:["januaro","februaro","marto","aprilo","majo","junio","julio","aŭgusto","septembro","oktobro","novembro","decembro"],SHORTDAY:["di","lu","ma","me","ĵa","ve","sa"],SHORTMONTH:["jan","feb","mar","apr","maj","jun","jul","aŭg","sep","okt","nov","dec"],STANDALONEMONTH:["januaro","februaro","marto","aprilo","majo","junio","julio","aŭgusto","septembro","oktobro","novembro","decembro"],WEEKENDRANGE:[5,6],fullDate:"EEEE, d-'a' 'de' MMMM y",longDate:"y-MMMM-dd",medium:"y-MMM-dd HH:mm:ss",mediumDate:"y-MMM-dd",mediumTime:"HH:mm:ss",short:"yy-MM-dd HH:mm",shortDate:"yy-MM-dd",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-¤ ",negSuf:"",posPre:"¤ ",posSuf:""}]},id:"eo-001",localeID:"eo_001",pluralCat:function(a,b){var e=0|a,f=c(a,b);return 1==e&&0==f.v?d.ONE:d.OTHER}})}]);