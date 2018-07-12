"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["ص","م"],DAY:["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],ERANAMES:["قبل الميلاد","ميلادي"],ERAS:["ق.م","م"],FIRSTDAYOFWEEK:6,MONTH:["جانفي","فيفري","مارس","أفريل","ماي","جوان","جويلية","أوت","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],SHORTDAY:["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],SHORTMONTH:["جانفي","فيفري","مارس","أفريل","ماي","جوان","جويلية","أوت","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],STANDALONEMONTH:["جانفي","فيفري","مارس","أفريل","ماي","جوان","جويلية","أوت","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],WEEKENDRANGE:[4,5],fullDate:"EEEE، d MMMM، y",longDate:"d MMMM، y",medium:"dd‏/MM‏/y h:mm:ss a",mediumDate:"dd‏/MM‏/y",mediumTime:"h:mm:ss a",short:"d‏/M‏/y h:mm a",shortDate:"d‏/M‏/y",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"din",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-¤ ",negSuf:"",posPre:"¤ ",posSuf:""}]},id:"ar-tn",localeID:"ar_TN",pluralCat:function(a,c){return 0==a?b.ZERO:1==a?b.ONE:2==a?b.TWO:a%100>=3&&a%100<=10?b.FEW:a%100>=11&&a%100<=99?b.MANY:b.OTHER}})}]);