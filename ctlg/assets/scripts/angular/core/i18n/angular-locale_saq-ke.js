"use strict";angular.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}function c(a,c){var d=c;void 0===d&&(d=Math.min(b(a),3));var e=Math.pow(10,d);return{v:d,f:(a*e|0)%e}}var d={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["Tesiran","Teipa"],DAY:["Mderot ee are","Mderot ee kuni","Mderot ee ong’wan","Mderot ee inet","Mderot ee ile","Mderot ee sapa","Mderot ee kwe"],ERANAMES:["Kabla ya Christo","Baada ya Christo"],ERAS:["KK","BK"],FIRSTDAYOFWEEK:0,MONTH:["Lapa le obo","Lapa le waare","Lapa le okuni","Lapa le ong’wan","Lapa le imet","Lapa le ile","Lapa le sapa","Lapa le isiet","Lapa le saal","Lapa le tomon","Lapa le tomon obo","Lapa le tomon waare"],SHORTDAY:["Are","Kun","Ong","Ine","Ile","Sap","Kwe"],SHORTMONTH:["Obo","Waa","Oku","Ong","Ime","Ile","Sap","Isi","Saa","Tom","Tob","Tow"],STANDALONEMONTH:["Lapa le obo","Lapa le waare","Lapa le okuni","Lapa le ong’wan","Lapa le imet","Lapa le ile","Lapa le sapa","Lapa le isiet","Lapa le saal","Lapa le tomon","Lapa le tomon obo","Lapa le tomon waare"],WEEKENDRANGE:[5,6],fullDate:"EEEE, d MMMM y",longDate:"d MMMM y",medium:"d MMM y h:mm:ss a",mediumDate:"d MMM y",mediumTime:"h:mm:ss a",short:"dd/MM/y h:mm a",shortDate:"dd/MM/y",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"Ksh",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-¤",negSuf:"",posPre:"¤",posSuf:""}]},id:"saq-ke",localeID:"saq_KE",pluralCat:function(a,b){var e=0|a,f=c(a,b);return 1==e&&0==f.v?d.ONE:d.OTHER}})}]);