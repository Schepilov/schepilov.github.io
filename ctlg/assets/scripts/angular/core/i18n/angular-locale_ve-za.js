"use strict";angular.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}function c(a,c){var d=c;void 0===d&&(d=Math.min(b(a),3));var e=Math.pow(10,d);return{v:d,f:(a*e|0)%e}}var d={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:["Swondaha","Musumbuluwo","Ḽavhuvhili","Ḽavhuraru","Ḽavhuṋa","Ḽavhuṱanu","Mugivhela"],ERANAMES:["BCE","CE"],ERAS:["BCE","CE"],FIRSTDAYOFWEEK:6,MONTH:["Phando","Luhuhi","Ṱhafamuhwe","Lambamai","Shundunthule","Fulwi","Fulwana","Ṱhangule","Khubvumedzi","Tshimedzi","Ḽara","Nyendavhusiku"],SHORTDAY:["Swo","Mus","Vhi","Rar","Ṋa","Ṱan","Mug"],SHORTMONTH:["Pha","Luh","Ṱhf","Lam","Shu","Lwi","Lwa","Ṱha","Khu","Tsh","Ḽar","Nye"],WEEKENDRANGE:[5,6],fullDate:"y MMMM d, EEEE",longDate:"y MMMM d",medium:"y MMM d HH:mm:ss",mediumDate:"y MMM d",mediumTime:"HH:mm:ss",short:"y-MM-dd HH:mm",shortDate:"y-MM-dd",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"R",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"¤-",negSuf:"",posPre:"¤",posSuf:""}]},id:"ve-za",pluralCat:function(a,b){var e=0|a,f=c(a,b);return 1==e&&0==f.v?d.ONE:d.OTHER}})}]);