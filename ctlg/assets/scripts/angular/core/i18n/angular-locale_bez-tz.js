"use strict";angular.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}function c(a,c){var d=c;void 0===d&&(d=Math.min(b(a),3));var e=Math.pow(10,d);return{v:d,f:(a*e|0)%e}}var d={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["pamilau","pamunyi"],DAY:["pa mulungu","pa shahuviluha","pa hivili","pa hidatu","pa hitayi","pa hihanu","pa shahulembela"],ERANAMES:["Kabla ya Mtwaa","Baada ya Mtwaa"],ERAS:["KM","BM"],FIRSTDAYOFWEEK:0,MONTH:["pa mwedzi gwa hutala","pa mwedzi gwa wuvili","pa mwedzi gwa wudatu","pa mwedzi gwa wutai","pa mwedzi gwa wuhanu","pa mwedzi gwa sita","pa mwedzi gwa saba","pa mwedzi gwa nane","pa mwedzi gwa tisa","pa mwedzi gwa kumi","pa mwedzi gwa kumi na moja","pa mwedzi gwa kumi na mbili"],SHORTDAY:["Mul","Vil","Hiv","Hid","Hit","Hih","Lem"],SHORTMONTH:["Hut","Vil","Dat","Tai","Han","Sit","Sab","Nan","Tis","Kum","Kmj","Kmb"],STANDALONEMONTH:["pa mwedzi gwa hutala","pa mwedzi gwa wuvili","pa mwedzi gwa wudatu","pa mwedzi gwa wutai","pa mwedzi gwa wuhanu","pa mwedzi gwa sita","pa mwedzi gwa saba","pa mwedzi gwa nane","pa mwedzi gwa tisa","pa mwedzi gwa kumi","pa mwedzi gwa kumi na moja","pa mwedzi gwa kumi na mbili"],WEEKENDRANGE:[5,6],fullDate:"EEEE, d MMMM y",longDate:"d MMMM y",medium:"d MMM y h:mm:ss a",mediumDate:"d MMM y",mediumTime:"h:mm:ss a",short:"dd/MM/y h:mm a",shortDate:"dd/MM/y",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"TSh",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:"¤",posPre:"",posSuf:"¤"}]},id:"bez-tz",localeID:"bez_TZ",pluralCat:function(a,b){var e=0|a,f=c(a,b);return 1==e&&0==f.v?d.ONE:d.OTHER}})}]);