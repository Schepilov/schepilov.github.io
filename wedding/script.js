/* ----------------------------------------------------------
   1. Подстановка текстов из config.js в [data-text="..."]
   ---------------------------------------------------------- */

(function () {
  'use strict';

  var cfg = window.WEDDING_CONFIG;
  if (!cfg) return;

  function bindTexts() {
    document.querySelectorAll('[data-text]').forEach(function (el) {
      var path  = el.getAttribute('data-text');
      var value = path.split('.').reduce(function (obj, key) {
        return obj == null ? undefined : obj[key];
      }, cfg);
      if (typeof value === 'string') el.textContent = value;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindTexts);
  } else {
    bindTexts();
  }
})();


/* ----------------------------------------------------------
   2. Анкета гостей (RSVP) — формируется из window.RSVP_CONFIG
   ---------------------------------------------------------- */

(function () {
  'use strict';

  var cfg = window.RSVP_CONFIG;
  if (!cfg) return;

  var EVENTS = {
    day1:   'на росписи (16 июля)',
    dinner: 'на семейном ужине (16 июля)',
    day2:   'на вечеринке (19 июля)',
  };

  var ATTENDANCE = [
    { val: 'yes', label: 'будет'    },
    { val: 'no',  label: 'не будет' },
  ];

  var DRINKS = [
    { val: 'soft',       label: 'безалкогольные' },
    { val: 'white_wine', label: 'белое вино'      },
    { val: 'red_wine',   label: 'красное вино'    },
    { val: 'sparkling',  label: 'игристое'        },
    { val: 'beer',       label: 'пиво'            },
  ];

  var ALLERGENS = [
    'орехи', 'морепродукты', 'яйца', 'соя',
    'цитрусовые', 'клубника', 'мёд', 'шоколад',
    'рыба', 'морковь', 'сельдерей',
  ];

  var INTOLERANCES = [
    'лактоза', 'глютен', 'фруктоза',
    'гистамин', 'сорбит', 'казеин',
  ];

  var HOT = [
    { val: 'meat', label: 'мясо', hint: 'говяжьи щёчки с луком‑пореем и кремом пармезан' },
    { val: 'fish', label: 'рыба', hint: 'лосось со спаржей и цветной капустой'            },
  ];

  var plusOneCounter = 0;

  function mk(tag, cls) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    return el;
  }

  function uid(guestId, suffix) {
    return 'rsvp-' + guestId + '-' + suffix;
  }

  function makePills(name, items) {
    var wrap = mk('div', 'pill-group');
    items.forEach(function (item) {
      var inp = document.createElement('input');
      inp.type = 'radio'; inp.name = name;
      inp.id = name + '-' + item.val; inp.value = item.val;
      inp.className = 'sr-only';

      var lbl = document.createElement('label');
      lbl.htmlFor = inp.id; lbl.className = 'pill';
      lbl.textContent = item.label;

      wrap.appendChild(inp);
      wrap.appendChild(lbl);
    });
    return wrap;
  }

  function makeCheckPills(namePrefix, items) {
    var wrap = mk('div', 'pill-group pill-group_wrap');
    items.forEach(function (item) {
      var label = item.label || item;
      var val   = item.val   || label.toLowerCase().replace(/[^a-z0-9а-яёa-z]/gi, '_');
      var id    = namePrefix + '-' + val;

      var inp = document.createElement('input');
      inp.type = 'checkbox'; inp.name = namePrefix + '[]';
      inp.id = id; inp.value = val; inp.className = 'sr-only';

      var lbl = document.createElement('label');
      lbl.htmlFor = id; lbl.className = 'pill';
      lbl.textContent = label;

      wrap.appendChild(inp);
      wrap.appendChild(lbl);
    });
    return wrap;
  }

  function buildDrinksSection(gid) {
    var wrap = mk('div', 'rsvp-field');
    var ttl  = mk('p', 'rsvp-field__label');
    ttl.textContent = 'Напитки';
    wrap.appendChild(ttl);

    var pills = makeCheckPills(uid(gid, 'drinks'), DRINKS);
    wrap.appendChild(pills);

    var reveal = mk('div', 'rsvp-reveal');
    reveal.hidden = true;
    var tinp = document.createElement('input');
    tinp.type = 'text'; tinp.name = uid(gid, 'drinks_strong_detail');
    tinp.placeholder = 'Уточните предпочтение (виски, коньяк, водка…)';
    tinp.className = 'rsvp-input';
    reveal.appendChild(tinp);
    wrap.appendChild(reveal);

    var strongCb = pills.querySelector('#' + uid(gid, 'drinks') + '-strong');
    if (strongCb) {
      strongCb.addEventListener('change', function () {
        reveal.hidden = !this.checked;
      });
    }

    return wrap;
  }

  function buildHotSection(gid) {
    var wrap = mk('div', 'rsvp-field');
    var ttl  = mk('p', 'rsvp-field__label');
    ttl.textContent = 'Горячее';
    wrap.appendChild(ttl);

    var list = mk('div', 'hot-list');
    HOT.forEach(function (item) {
      var id = uid(gid, 'hot') + '-' + item.val;

      var inp = document.createElement('input');
      inp.type = 'radio'; inp.name = uid(gid, 'hot');
      inp.id = id; inp.value = item.val; inp.className = 'sr-only';

      var lbl = mk('label', 'hot-option');
      lbl.htmlFor = id;

      var nameSpan = mk('span', 'hot-option__name');
      nameSpan.textContent = item.label;
      var hintSpan = mk('span', 'hot-option__hint');
      hintSpan.textContent = item.hint;

      lbl.appendChild(nameSpan);
      lbl.appendChild(hintSpan);

      var itemWrap = mk('div', 'hot-item');
      itemWrap.appendChild(inp);
      itemWrap.appendChild(lbl);
      list.appendChild(itemWrap);
    });
    wrap.appendChild(list);
    return wrap;
  }

  function buildMulticheck(namePrefix, items, placeholder) {
    var wrap = mk('div', 'multicheck');
    wrap.appendChild(makeCheckPills(namePrefix, items));
    var inp = document.createElement('input');
    inp.type = 'text'; inp.name = namePrefix + '_custom';
    inp.placeholder = placeholder; inp.className = 'rsvp-input';
    wrap.appendChild(inp);
    return wrap;
  }

  function buildAllergySection(gid) {
    var wrap = mk('div', 'rsvp-field');
    var ttl  = mk('p', 'rsvp-field__label');
    ttl.textContent = 'Аллергии и непереносимости';
    wrap.appendChild(ttl);

    var yesNo = makePills(uid(gid, 'allergy'), [
      { val: 'no',  label: 'нет'  },
      { val: 'yes', label: 'есть' },
    ]);
    wrap.appendChild(yesNo);

    var reveal = mk('div', 'rsvp-reveal');
    reveal.hidden = true;

    var sub1 = mk('p', 'rsvp-field__sublabel');
    sub1.textContent = 'Аллергии';
    reveal.appendChild(sub1);
    reveal.appendChild(buildMulticheck(uid(gid, 'allergens'), ALLERGENS, 'другие аллергии…'));

    var sub2 = mk('p', 'rsvp-field__sublabel');
    sub2.textContent = 'Непереносимости';
    reveal.appendChild(sub2);
    reveal.appendChild(buildMulticheck(uid(gid, 'intolerances'), INTOLERANCES, 'другие непереносимости…'));

    wrap.appendChild(reveal);

    yesNo.querySelectorAll('input').forEach(function (inp) {
      inp.addEventListener('change', function () {
        reveal.hidden = (this.value !== 'yes');
      });
    });

    return wrap;
  }

  function buildPartySection(gid) {
    var wrap = mk('div', 'party-section');
    wrap.appendChild(buildDrinksSection(gid));
    wrap.appendChild(buildHotSection(gid));
    wrap.appendChild(buildAllergySection(gid));
    return wrap;
  }

  function buildEventsSection(gid, events) {
    var wrap = mk('div', 'rsvp-events');
    events.forEach(function (evKey) {
      var evWrap = mk('div', 'rsvp-event');
      var lbl = mk('p', 'rsvp-field__label');
      lbl.textContent = EVENTS[evKey] || evKey;
      evWrap.appendChild(lbl);
      evWrap.appendChild(makePills(uid(gid, 'att-' + evKey), ATTENDANCE));
      wrap.appendChild(evWrap);
    });
    return wrap;
  }

  function buildGuestCard(gid, name, events, isNew) {
    var card = mk('div', 'guest-card');
    card.dataset.guestId = gid;

    var header = mk('div', 'guest-card__header');
    if (isNew) {
      var nameInp = document.createElement('input');
      nameInp.type = 'text'; nameInp.name = uid(gid, 'name');
      nameInp.placeholder = 'имя и фамилия гостя';
      nameInp.className = 'rsvp-input guest-card__name-input';
      header.appendChild(nameInp);

      var removeBtn = mk('button', 'guest-card__remove');
      removeBtn.type = 'button';
      removeBtn.setAttribute('aria-label', 'Удалить гостя');
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', function () { card.remove(); });
      header.appendChild(removeBtn);
    } else {
      var nameEl = mk('p', 'guest-card__name');
      nameEl.textContent = name;
      header.appendChild(nameEl);
    }
    card.appendChild(header);

    card.appendChild(buildEventsSection(gid, events));

    if (events.indexOf('day2') !== -1) {
      var partyWrap = mk('div', 'party-section-wrap');
      partyWrap.hidden = true;
      partyWrap.appendChild(buildPartySection(gid));
      card.appendChild(partyWrap);

      card.querySelectorAll('[name="' + uid(gid, 'att-day2') + '"]').forEach(function (inp) {
        inp.addEventListener('change', function () {
          partyWrap.hidden = (this.value !== 'yes');
        });
      });
    }

    return card;
  }

  function init() {
    var list   = document.getElementById('rsvp-guest-list');
    var addBtn = document.getElementById('rsvp-add-btn');
    if (!list) return;

    (cfg.guests || []).forEach(function (g) {
      list.appendChild(buildGuestCard(g.id, g.name, g.events, false));
    });

    if (cfg.plusOneAllowed && addBtn) {
      addBtn.addEventListener('click', function () {
        plusOneCounter++;
        var gid    = 'plus' + plusOneCounter;
        var events = cfg.plusOneEvents || ['day2'];
        var card   = buildGuestCard(gid, '', events, true);
        list.appendChild(card);
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    } else if (addBtn) {
      addBtn.style.display = 'none';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
