"use strict";angular.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}function c(a,c){var d=c;void 0===d&&(d=Math.min(b(a),3));var e=Math.pow(10,d);return{v:d,f:(a*e|0)%e}}var d={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["Àárɔ̀","Ɔ̀sán"],DAY:["Ɔjɔ́ Àìkú","Ɔjɔ́ Ajé","Ɔjɔ́ Ìsɛ́gun","Ɔjɔ́rú","Ɔjɔ́bɔ","Ɔjɔ́ Ɛtì","Ɔjɔ́ Àbámɛ́ta"],ERANAMES:["Saju Kristi","Lehin Kristi"],ERAS:["SK","LK"],FIRSTDAYOFWEEK:0,MONTH:["Oshù Shɛ́rɛ́","Oshù Èrèlè","Oshù Ɛrɛ̀nà","Oshù Ìgbé","Oshù Ɛ̀bibi","Oshù Òkúdu","Oshù Agɛmɔ","Oshù Ògún","Oshù Owewe","Oshù Ɔ̀wàrà","Oshù Bélú","Oshù Ɔ̀pɛ̀"],SHORTDAY:["Àìkú","Ajé","Ìsɛ́gun","Ɔjɔ́rú","Ɔjɔ́bɔ","Ɛtì","Àbámɛ́ta"],SHORTMONTH:["Shɛ́rɛ́","Èrèlè","Ɛrɛ̀nà","Ìgbé","Ɛ̀bibi","Òkúdu","Agɛmɔ","Ògún","Owewe","Ɔ̀wàrà","Bélú","Ɔ̀pɛ̀"],STANDALONEMONTH:["Oshù Shɛ́rɛ́","Oshù Èrèlè","Oshù Ɛrɛ̀nà","Oshù Ìgbé","Oshù Ɛ̀bibi","Oshù Òkúdu","Oshù Agɛmɔ","Oshù Ògún","Oshù Owewe","Oshù Ɔ̀wàrà","Oshù Bélú","Oshù Ɔ̀pɛ̀"],WEEKENDRANGE:[5,6],fullDate:"EEEE, d MMMM y",longDate:"d MMMM y",medium:"d MMM y h:mm:ss a",mediumDate:"d MMM y",mediumTime:"h:mm:ss a",short:"dd/MM/y h:mm a",shortDate:"dd/MM/y",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"CFA",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-¤",negSuf:"",posPre:"¤",posSuf:""}]},id:"yo-bj",localeID:"yo_BJ",pluralCat:function(a,b){var e=0|a,f=c(a,b);return 1==e&&0==f.v?d.ONE:d.OTHER}})}]);