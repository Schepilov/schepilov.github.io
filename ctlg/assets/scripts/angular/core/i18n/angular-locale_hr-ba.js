"use strict";angular.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}function c(a,c){var d=c;void 0===d&&(d=Math.min(b(a),3));var e=Math.pow(10,d);return{v:d,f:(a*e|0)%e}}var d={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"],ERANAMES:["Prije Krista","Poslije Krista"],ERAS:["pr. Kr.","p. Kr."],FIRSTDAYOFWEEK:0,MONTH:["siječnja","veljače","ožujka","travnja","svibnja","lipnja","srpnja","kolovoza","rujna","listopada","studenoga","prosinca"],SHORTDAY:["ned","pon","uto","sri","čet","pet","sub"],SHORTMONTH:["sij","velj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro"],STANDALONEMONTH:["siječanj","veljača","ožujak","travanj","svibanj","lipanj","srpanj","kolovoz","rujan","listopad","studeni","prosinac"],WEEKENDRANGE:[5,6],fullDate:"EEEE, d. MMMM y.",longDate:"d. MMMM y.",medium:"d. MMM y. HH:mm:ss",mediumDate:"d. MMM y.",mediumTime:"HH:mm:ss",short:"dd.MM.y. HH:mm",shortDate:"dd.MM.y.",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"KM",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"hr-ba",localeID:"hr_BA",pluralCat:function(a,b){var e=0|a,f=c(a,b);return 0==f.v&&e%10==1&&e%100!=11||f.f%10==1&&f.f%100!=11?d.ONE:0==f.v&&e%10>=2&&e%10<=4&&(e%100<12||e%100>14)||f.f%10>=2&&f.f%10<=4&&(f.f%100<12||f.f%100>14)?d.FEW:d.OTHER}})}]);