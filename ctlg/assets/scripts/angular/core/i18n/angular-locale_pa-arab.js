"use strict";angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:["اتوار","پیر","منگل","بُدھ","جمعرات","جمعہ","ہفتہ"],ERANAMES:["ايساپورو","سں"],ERAS:["BCE","CE"],FIRSTDAYOFWEEK:0,MONTH:["جنوری","فروری","مارچ","اپریل","مئ","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر"],SHORTDAY:["اتوار","پیر","منگل","بُدھ","جمعرات","جمعہ","ہفتہ"],SHORTMONTH:["جنوری","فروری","مارچ","اپریل","مئ","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر"],STANDALONEMONTH:["جنوری","فروری","مارچ","اپریل","مئ","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر"],WEEKENDRANGE:[5,6],fullDate:"EEEE, dd MMMM y",longDate:"d MMMM y",medium:"d MMM y h:mm:ss a",mediumDate:"d MMM y",mediumTime:"h:mm:ss a",short:"dd/MM/y h:mm a",shortDate:"dd/MM/y",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"Rs",DECIMAL_SEP:"٫",GROUP_SEP:"٬",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-¤ ",negSuf:"",posPre:"¤ ",posSuf:""}]},id:"pa-arab",localeID:"pa_Arab",pluralCat:function(a,c){return a>=0&&a<=1?b.ONE:b.OTHER}})}]);