"use strict";angular.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}function c(a,c){var d=c;void 0===d&&(d=Math.min(b(a),3));var e=Math.pow(10,d);return{v:d,f:(a*e|0)%e}}var d={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["Lwamilawu","Pashamihe"],DAY:["Mulungu","Jumatatu","Jumanne","Jumatano","Alahamisi","Ijumaa","Jumamosi"],ERANAMES:["Ashanali uKilisito","Pamwandi ya Kilisto"],ERAS:["AK","PK"],FIRSTDAYOFWEEK:0,MONTH:["Mupalangulwa","Mwitope","Mushende","Munyi","Mushende Magali","Mujimbi","Mushipepo","Mupuguto","Munyense","Mokhu","Musongandembwe","Muhaano"],SHORTDAY:["Mul","Jtt","Jnn","Jtn","Alh","Iju","Jmo"],SHORTMONTH:["Mup","Mwi","Msh","Mun","Mag","Muj","Msp","Mpg","Mye","Mok","Mus","Muh"],STANDALONEMONTH:["Mupalangulwa","Mwitope","Mushende","Munyi","Mushende Magali","Mujimbi","Mushipepo","Mupuguto","Munyense","Mokhu","Musongandembwe","Muhaano"],WEEKENDRANGE:[5,6],fullDate:"EEEE, d MMMM y",longDate:"d MMMM y",medium:"d MMM y h:mm:ss a",mediumDate:"d MMM y",mediumTime:"h:mm:ss a",short:"dd/MM/y h:mm a",shortDate:"dd/MM/y",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"TSh",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:"¤",posPre:"",posSuf:"¤"}]},id:"sbp-tz",localeID:"sbp_TZ",pluralCat:function(a,b){var e=0|a,f=c(a,b);return 1==e&&0==f.v?d.ONE:d.OTHER}})}]);