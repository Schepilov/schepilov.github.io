"use strict";angular.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}function c(a,c){var d=c;void 0===d&&(d=Math.min(b(a),3));var e=Math.pow(10,d);return{v:d,f:(a*e|0)%e}}var d={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["a.m.","p.m."],DAY:["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],ERANAMES:["BCE","d.C."],ERAS:["BCE","d.C."],FIRSTDAYOFWEEK:6,MONTH:["Qulla puquy","Hatun puquy","Pauqar waray","Ayriwa","Aymuray","Inti raymi","Anta Sitwa","Qhapaq Sitwa","Uma raymi","Kantaray","Ayamarqʼa","Kapaq Raymi"],SHORTDAY:["Dom","Lun","Mar","Mié","Jue","Vie","Sab"],SHORTMONTH:["Qul","Hat","Pau","Ayr","Aym","Int","Ant","Qha","Uma","Kan","Aya","Kap"],STANDALONEMONTH:["Qulla puquy","Hatun puquy","Pauqar waray","Ayriwa","Aymuray","Inti raymi","Anta Sitwa","Qhapaq Sitwa","Uma raymi","Kantaray","Ayamarqʼa","Kapaq Raymi"],WEEKENDRANGE:[5,6],fullDate:"EEEE, d MMMM, y",longDate:"y MMMM d",medium:"y MMM d hh:mm:ss a",mediumDate:"y MMM d",mediumTime:"hh:mm:ss a",short:"dd/MM/y hh:mm a",shortDate:"dd/MM/y",shortTime:"hh:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"S/.",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-¤ ",negSuf:"",posPre:"¤ ",posSuf:""}]},id:"qu",localeID:"qu",pluralCat:function(a,b){var e=0|a,f=c(a,b);return 1==e&&0==f.v?d.ONE:d.OTHER}})}]);