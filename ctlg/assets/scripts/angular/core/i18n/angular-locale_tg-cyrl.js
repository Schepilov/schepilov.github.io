"use strict";angular.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}function c(a,c){var d=c;void 0===d&&(d=Math.min(b(a),3));var e=Math.pow(10,d);return{v:d,f:(a*e|0)%e}}var d={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["пе. чо.","па. чо."],DAY:["Якшанбе","Душанбе","Сешанбе","Чоршанбе","Панҷшанбе","Ҷумъа","Шанбе"],MONTH:["Январ","Феврал","Март","Апрел","Май","Июн","Июл","Август","Сентябр","Октябр","Ноябр","Декабр"],SHORTDAY:["Яшб","Дшб","Сшб","Чшб","Пшб","Ҷмъ","Шнб"],SHORTMONTH:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],fullDate:"EEEE, y MMMM dd",longDate:"y MMMM d",medium:"y MMM d HH:mm:ss",mediumDate:"y MMM d",mediumTime:"HH:mm:ss",short:"yy/MM/dd HH:mm",shortDate:"yy/MM/dd",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"€",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"¤ -",negSuf:"",posPre:"¤ ",posSuf:""}]},id:"tg-cyrl",pluralCat:function(a,b){var e=0|a,f=c(a,b);return 1==e&&0==f.v?d.ONE:d.OTHER}})}]);