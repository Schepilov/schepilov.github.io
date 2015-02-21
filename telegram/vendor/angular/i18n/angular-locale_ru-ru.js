'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
    var PLURAL_CATEGORY = {
        ONE: "one",
        FEW: "few",
        MANY: "many",
        OTHER: "other"
    };

    function getDecimals(n) {
      n = n + '';
      var i = n.indexOf('.');
      return (i == -1) ? 0 : n.length - i - 1;
    }

    function getVF(n, opt_precision) {
      var v = opt_precision;

      if (undefined === v) {
        v = Math.min(getDecimals(n), 3);
      }

      var base = Math.pow(10, v);
      var f = ((n * base) | 0) % base;
      return {v: v, f: f};
    }

    $provide.value("$locale", {
        "NUMBER_FORMATS": {
            "DECIMAL_SEP": ",",
            "GROUP_SEP": " ",
            "PATTERNS": [{
                "minInt": 1,
                "minFrac": 0,
                "macFrac": 0,
                "posPre": "",
                "posSuf": "",
                "negPre": "-",
                "negSuf": "",
                "gSize": 3,
                "lgSize": 3,
                "maxFrac": 3
            }, {
                "minInt": 1,
                "minFrac": 2,
                "macFrac": 0,
                "posPre": "",
                "posSuf": " \u00A4",
                "negPre": "-",
                "negSuf": " \u00A4",
                "gSize": 3,
                "lgSize": 3,
                "maxFrac": 2
            }],
            "CURRENCY_SYM": "руб"
        },
        "pluralCat": function(n) {
            if ((n % 10) == 1 && (n % 100) != 11) {
                return PLURAL_CATEGORY.ONE;
            }
            if ((n % 10) >= 2 && (n % 10) <= 4 && ((n % 100) < 12 || (n % 100) > 14) && n == Math.floor(n)) {
                return PLURAL_CATEGORY.FEW;
            }
            if ((n % 10) == 0 || ((n % 10) >= 5 && (n % 10) <= 9) || ((n % 100) >= 11 && (n % 100) <= 14) && n == Math.floor(n)) {
                return PLURAL_CATEGORY.MANY;
            }
            return PLURAL_CATEGORY.OTHER;
        },
        "DATETIME_FORMATS": {
            "MONTH": ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
            "SHORTMONTH": ["янв.", "фев.", "марта", "апр.", "мая", "июня", "июля", "авг.", "сент.", "окт.", "нояб.", "дек."],
            "DAY": ["в воскресенье", "в понедельник", "во вторник", "в среду", "в четверг", "в пятницу", "в субботу"],
            "SHORTDAY": ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
            "AMPMS": ["AM", "PM"],
            "medium": "dd.MM.yyyy H:mm:ss",
            "short": "dd.MM.yy H:mm",
            "fullDate": "d MMMM y 'г'.",
            "longDate": "d MMMM y 'г'.",
            "mediumDate": "dd.MM.yyyy",
            "shortDate": "dd.MM.yy",
            "mediumTime": "H:mm:ss",
            "shortTime": "H:mm"
        },
        "id": "ru-ru"
    });
}]);
