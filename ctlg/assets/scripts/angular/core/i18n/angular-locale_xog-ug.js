"use strict";angular.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}function c(a,c){var d=c;void 0===d&&(d=Math.min(b(a),3));var e=Math.pow(10,d);return{v:d,f:(a*e|0)%e}}var d={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["Munkyo","Eigulo"],DAY:["Sabiiti","Balaza","Owokubili","Owokusatu","Olokuna","Olokutaanu","Olomukaaga"],ERANAMES:["Kulisto nga azilawo","Kulisto nga affile"],ERAS:["AZ","AF"],FIRSTDAYOFWEEK:0,MONTH:["Janwaliyo","Febwaliyo","Marisi","Apuli","Maayi","Juuni","Julaayi","Agusito","Sebuttemba","Okitobba","Novemba","Desemba"],SHORTDAY:["Sabi","Bala","Kubi","Kusa","Kuna","Kuta","Muka"],SHORTMONTH:["Jan","Feb","Mar","Apu","Maa","Juu","Jul","Agu","Seb","Oki","Nov","Des"],STANDALONEMONTH:["Janwaliyo","Febwaliyo","Marisi","Apuli","Maayi","Juuni","Julaayi","Agusito","Sebuttemba","Okitobba","Novemba","Desemba"],WEEKENDRANGE:[5,6],fullDate:"EEEE, d MMMM y",longDate:"d MMMM y",medium:"d MMM y h:mm:ss a",mediumDate:"d MMM y",mediumTime:"h:mm:ss a",short:"dd/MM/y h:mm a",shortDate:"dd/MM/y",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"UGX",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"xog-ug",localeID:"xog_UG",pluralCat:function(a,b){var e=0|a,f=c(a,b);return 1==e&&0==f.v?d.ONE:d.OTHER}})}]);