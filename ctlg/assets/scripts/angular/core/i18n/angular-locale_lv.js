"use strict";angular.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}function c(a,c){var d=c;void 0===d&&(d=Math.min(b(a),3));var e=Math.pow(10,d);return{v:d,f:(a*e|0)%e}}var d={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["priekšpusdienā","pēcpusdienā"],DAY:["svētdiena","pirmdiena","otrdiena","trešdiena","ceturtdiena","piektdiena","sestdiena"],ERANAMES:["pirms mūsu ēras","mūsu ērā"],ERAS:["p.m.ē.","m.ē."],FIRSTDAYOFWEEK:0,MONTH:["janvāris","februāris","marts","aprīlis","maijs","jūnijs","jūlijs","augusts","septembris","oktobris","novembris","decembris"],SHORTDAY:["Sv","Pr","Ot","Tr","Ce","Pk","Se"],SHORTMONTH:["janv.","febr.","marts","apr.","maijs","jūn.","jūl.","aug.","sept.","okt.","nov.","dec."],STANDALONEMONTH:["Janvāris","Februāris","Marts","Aprīlis","Maijs","Jūnijs","Jūlijs","Augusts","Septembris","Oktobris","Novembris","Decembris"],WEEKENDRANGE:[5,6],fullDate:"EEEE, y. 'gada' d. MMMM",longDate:"y. 'gada' d. MMMM",medium:"y. 'gada' d. MMM HH:mm:ss",mediumDate:"y. 'gada' d. MMM",mediumTime:"HH:mm:ss",short:"dd.MM.yy HH:mm",shortDate:"dd.MM.yy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"€",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:0,lgSize:0,maxFrac:2,minFrac:2,minInt:1,negPre:"-¤",negSuf:"",posPre:"¤",posSuf:""}]},id:"lv",localeID:"lv",pluralCat:function(a,b){var e=c(a,b);return a%10==0||a%100>=11&&a%100<=19||2==e.v&&e.f%100>=11&&e.f%100<=19?d.ZERO:a%10==1&&a%100!=11||2==e.v&&e.f%10==1&&e.f%100!=11||2!=e.v&&e.f%10==1?d.ONE:d.OTHER}})}]);