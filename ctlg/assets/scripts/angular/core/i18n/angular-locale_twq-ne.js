"use strict";angular.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}function c(a,c){var d=c;void 0===d&&(d=Math.min(b(a),3));var e=Math.pow(10,d);return{v:d,f:(a*e|0)%e}}var d={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["Subbaahi","Zaarikay b"],DAY:["Alhadi","Atinni","Atalaata","Alarba","Alhamiisa","Alzuma","Asibti"],ERANAMES:["Isaa jine","Isaa zamanoo"],ERAS:["IJ","IZ"],FIRSTDAYOFWEEK:0,MONTH:["Žanwiye","Feewiriye","Marsi","Awiril","Me","Žuweŋ","Žuyye","Ut","Sektanbur","Oktoobur","Noowanbur","Deesanbur"],SHORTDAY:["Alh","Ati","Ata","Ala","Alm","Alz","Asi"],SHORTMONTH:["Žan","Fee","Mar","Awi","Me","Žuw","Žuy","Ut","Sek","Okt","Noo","Dee"],STANDALONEMONTH:["Žanwiye","Feewiriye","Marsi","Awiril","Me","Žuweŋ","Žuyye","Ut","Sektanbur","Oktoobur","Noowanbur","Deesanbur"],WEEKENDRANGE:[5,6],fullDate:"EEEE d MMMM y",longDate:"d MMMM y",medium:"d MMM y HH:mm:ss",mediumDate:"d MMM y",mediumTime:"HH:mm:ss",short:"d/M/y HH:mm",shortDate:"d/M/y",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"CFA",DECIMAL_SEP:".",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:"¤",posPre:"",posSuf:"¤"}]},id:"twq-ne",localeID:"twq_NE",pluralCat:function(a,b){var e=0|a,f=c(a,b);return 1==e&&0==f.v?d.ONE:d.OTHER}})}]);