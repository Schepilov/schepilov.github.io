"use strict";angular.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}function c(a,c){var d=c;void 0===d&&(d=Math.min(b(a),3));var e=Math.pow(10,d);return{v:d,f:(a*e|0)%e}}var d={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["dop.","pop."],DAY:["nedelja","ponedeljek","torek","sreda","četrtek","petek","sobota"],ERANAMES:["pred našim štetjem","naše štetje"],ERAS:["pr. n. št.","po Kr."],FIRSTDAYOFWEEK:0,MONTH:["januar","februar","marec","april","maj","junij","julij","avgust","september","oktober","november","december"],SHORTDAY:["ned.","pon.","tor.","sre.","čet.","pet.","sob."],SHORTMONTH:["jan.","feb.","mar.","apr.","maj","jun.","jul.","avg.","sep.","okt.","nov.","dec."],STANDALONEMONTH:["januar","februar","marec","april","maj","junij","julij","avgust","september","oktober","november","december"],WEEKENDRANGE:[5,6],fullDate:"EEEE, dd. MMMM y",longDate:"dd. MMMM y",medium:"d. MMM y HH:mm:ss",mediumDate:"d. MMM y",mediumTime:"HH:mm:ss",short:"d. MM. yy HH:mm",shortDate:"d. MM. yy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"€",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"sl-si",localeID:"sl_SI",pluralCat:function(a,b){var e=0|a,f=c(a,b);return 0==f.v&&e%100==1?d.ONE:0==f.v&&e%100==2?d.TWO:0==f.v&&e%100>=3&&e%100<=4||0!=f.v?d.FEW:d.OTHER}})}]);