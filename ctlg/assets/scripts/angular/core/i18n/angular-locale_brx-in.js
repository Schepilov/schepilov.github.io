"use strict";angular.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}function c(a,c){var d=c;void 0===d&&(d=Math.min(b(a),3));var e=Math.pow(10,d);return{v:d,f:(a*e|0)%e}}var d={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["फुं","बेलासे"],DAY:["रबिबार","समबार","मंगलबार","बुदबार","बिसथिबार","सुखुरबार","सुनिबार"],ERANAMES:["ईसा.पूर्व","सन"],ERAS:["ईसा.पूर्व","सन"],FIRSTDAYOFWEEK:0,MONTH:["जानुवारी","फेब्रुवारी","मार्स","एफ्रिल","मे","जुन","जुलाइ","आगस्थ","सेबथेज्ब़र","अखथबर","नबेज्ब़र","दिसेज्ब़र"],SHORTDAY:["रबि","सम","मंगल","बुद","बिसथि","सुखुर","सुनि"],SHORTMONTH:["जानुवारी","फेब्रुवारी","मार्स","एफ्रिल","मे","जुन","जुलाइ","आगस्थ","सेबथेज्ब़र","अखथबर","नबेज्ब़र","दिसेज्ब़र"],STANDALONEMONTH:["जानुवारी","फेब्रुवारी","मार्स","एफ्रिल","मे","जुन","जुलाइ","आगस्थ","सेबथेज्ब़र","अखथबर","नबेज्ब़र","दिसेज्ब़र"],WEEKENDRANGE:[5,6],fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",medium:"MMM d, y h:mm:ss a",mediumDate:"MMM d, y",mediumTime:"h:mm:ss a",short:"M/d/yy h:mm a",shortDate:"M/d/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"₹",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:2,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:2,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-¤ ",negSuf:"",posPre:"¤ ",posSuf:""}]},id:"brx-in",localeID:"brx_IN",pluralCat:function(a,b){var e=0|a,f=c(a,b);return 1==e&&0==f.v?d.ONE:d.OTHER}})}]);