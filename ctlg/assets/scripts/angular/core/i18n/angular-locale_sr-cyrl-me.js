"use strict";angular.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}function c(a,c){var d=c;void 0===d&&(d=Math.min(b(a),3));var e=Math.pow(10,d);return{v:d,f:(a*e|0)%e}}var d={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["пре подне","по подне"],DAY:["недеља","понедељак","уторак","среда","четвртак","петак","субота"],ERANAMES:["Пре нове ере","Нове ере"],ERAS:["п. н. е.","н. е."],FIRSTDAYOFWEEK:0,MONTH:["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар"],SHORTDAY:["нед","пон","уто","сре","чет","пет","суб"],SHORTMONTH:["јан","феб","мар","апр","мај","јун","јул","авг","сеп","окт","нов","дец"],STANDALONEMONTH:["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар"],WEEKENDRANGE:[5,6],fullDate:"EEEE, dd. MMMM y.",longDate:"dd. MMMM y.",medium:"dd.MM.y. HH.mm.ss",mediumDate:"dd.MM.y.",mediumTime:"HH.mm.ss",short:"d.M.yy. HH.mm",shortDate:"d.M.yy.",shortTime:"HH.mm"},NUMBER_FORMATS:{CURRENCY_SYM:"€",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"sr-cyrl-me",localeID:"sr_Cyrl_ME",pluralCat:function(a,b){var e=0|a,f=c(a,b);return 0==f.v&&e%10==1&&e%100!=11||f.f%10==1&&f.f%100!=11?d.ONE:0==f.v&&e%10>=2&&e%10<=4&&(e%100<12||e%100>14)||f.f%10>=2&&f.f%10<=4&&(f.f%100<12||f.f%100>14)?d.FEW:d.OTHER}})}]);