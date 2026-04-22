# Свадебный сайт-приглашение — контекст проекта

## Общие сведения

Статический HTML/CSS/JS сайт-приглашение на свадьбу Саши и Ксюши.  
**Нет** сборщиков, npm-пакетов, фреймворков — чистый ванильный стек.  
Новое расположение: `D:\GitHub\schepilov.github.io\wedding\`

Владелец: **Александр** (жених). HTML/CSS понимает хорошо, JS/API — нулевые знания.  
Дата свадьбы: **16 июля 2026** (роспись + семейный ужин), **19 июля 2026** (вечеринка).

---

## Структура файлов

```
wedding/
├── index.html          — единственная страница
├── styles.css          — все стили
├── app.js              — загрузчик, музыкальная заставка, карусель, IntersectionObserver
├── script.js           — подстановка текстов + динамическая RSVP-форма
├── config.js           — WEDDING_CONFIG + RSVP_CONFIG (персональные данные)
├── assets/
│   ├── icons/
│   │   └── heart-3.svg — SVG-маска сердечка (используется в loader + gate)
│   ├── fonts/          — Lapkoi (заголовки), TT Chocolates (текст)
│   ├── images/         — фото пары, дресс-код и т.д.
│   └── audio/          — фоновая музыка
└── CONTEXT.md          — этот файл
```

Скрипты подключаются в конце `<body>` в порядке: `config.js` → `script.js` → `app.js`.

---

## Дизайн-система (CSS custom properties)

```css
:root {
  --color-bg:      #FCEAEE;
  --color-text:    #340410;
  --color-accent:  #E70D3D;
  --color-white:   #FFFFFF;

  --font-heading:  "Lapkoi";
  --font-body:     "TT Chocolates";

  --fs-heading:    60px;
  --fs-body:       20px;

  /* spacing, radius и другие токены — см. styles.css */
}
```

---

## Секции страницы (index.html)

1. **Loader** — прогресс-бар в форме сердечка, отслеживает загрузку `<img>`
2. **Music gate** — заставка «Нажмите, чтобы открыть приглашение», блокирует скролл до клика
3. **Hero** — имена пары, появляются через `body.is-open` → CSS-анимации
4. **Schedule day1** — программа 16 июля
5. **Schedule day2** — программа 19 июля
6. **Dresscode** — описание + карусель образцов
7. **Venue** — место, кнопка «Построить маршрут»
8. **RSVP** — анкета гостей (динамически строится из `RSVP_CONFIG`)
9. **Footer**

---

## app.js — архитектура

```javascript
// Хаптик — инициализируется ДО DOMContentLoaded
window._haptics = null;
(async () => {
  try {
    const { WebHaptics } = await import('https://cdn.jsdelivr.net/npm/web-haptics/+esm');
    window._haptics = new WebHaptics();
  } catch (e) {}
})();

document.addEventListener('DOMContentLoaded', () => {

  // 1. resetToTop() — сброс скролла (history.scrollRestoration = 'manual')
  // 2. lockScroll() / unlockScroll() — classList + body.style.top
  // 3. Loader:
  //    - rAF-анимация: progress плавно догоняет targetProgress (0.08 коэффициент)
  //    - setInterval 500ms: dots '.', '..', '...'
  //    - Отслеживание img.complete / 'load' / 'error'
  //    - showGate() → loader.classList.add('is-hidden'), gate.classList.add('is-visible')
  // 4. gate.addEventListener('click') → audio.play(), unlockScroll(), body.is-open, gate убирается
  // 5. visibilitychange → пауза/возобновление музыки
  // 6. Карусель (forEach .carousel):
  //    - goTo(index): slides[current].remove('is-active'), slides[new].add('is-active'), counter
  //    - .carousel__btn--prev / --next + haptics trigger([20])
  //    - touchstart/touchend: если |dx| > 40 → goTo + haptics
  // 7. IntersectionObserver (threshold: 0.15) → .reveal, .reveal-text → 'is-visible'

});
```

---

## script.js — архитектура

Два независимых IIFE.

### IIFE 1: bindTexts

Читает `window.WEDDING_CONFIG`, находит все `[data-text="..."]`, подставляет значение по пути (dot-notation).

### IIFE 2: RSVP-форма

Читает `window.RSVP_CONFIG`.

**Константы:**
```javascript
var EVENTS = {
  day1:   'на росписи (16 июля)',
  dinner: 'на семейном ужине (16 июля)',
  day2:   'на вечеринке (19 июля)',
};

var DRINKS = [
  { val: 'soft',       label: 'безалкогольные' },
  { val: 'white_wine', label: 'белое вино'      },
  { val: 'red_wine',   label: 'красное вино'    },
  { val: 'sparkling',  label: 'игристое'        },
  { val: 'beer',       label: 'пиво'            },
];

var HOT = [
  { val: 'meat', label: 'мясо', hint: 'говяжьи щёчки с луком‑пореем и кремом пармезан' },
  { val: 'fish', label: 'рыба', hint: 'лосось со спаржей и цветной капустой'            },
];

var ALLERGENS    = ['орехи', 'морепродукты', 'яйца', 'соя', 'цитрусовые', 'клубника', 'мёд', 'шоколад', 'рыба', 'морковь', 'сельдерей'];
var INTOLERANCES = ['лактоза', 'глютен', 'фруктоза', 'гистамин', 'сорбит', 'казеин'];
```

**Дерево функций:**
```
init()
  ├── buildGuestCard(gid, name, events, isNew)
  │     ├── buildEventsSection(gid, events)
  │     │     └── makePills(name, items)          — radio
  │     └── buildPartySection(gid)  [только если 'day2' в events]
  │           ├── buildDrinksSection(gid)
  │           │     └── makeCheckPills(namePrefix, items)  — checkbox
  │           ├── buildHotSection(gid)             — radio (особый layout)
  │           └── buildAllergySection(gid)
  │                 ├── makePills(...)              — radio yes/no
  │                 └── buildMulticheck(...)
  │                       └── makeCheckPills(...)
  ├── addBtn.click → buildGuestCard('plus1', '', events, true)
  └── form.submit → validateCard() × cards → rsvp--done / rsvp-confirm
```

**Хаптик внутри форм:**
```javascript
// В makePills, makeCheckPills, buildHotSection — при change:
inp.addEventListener('change', function () { window._haptics?.trigger([18]); });

// В addBtn click:
window._haptics?.trigger([20]);

// При валидной отправке:
window._haptics?.trigger('success');

// При ошибке:
window._haptics?.trigger('error');
```

**Успешная отправка:**
```javascript
window._haptics?.trigger('success');
var section = document.getElementById('rsvp');
if (section) {
  section.classList.add('rsvp--done');
  var prevSep = section.previousElementSibling;
  if (prevSep && prevSep.classList.contains('schedule__sep')) {
    prevSep.style.display = 'none';
  }
}
var confirm = document.getElementById('rsvp-confirm');
if (confirm) {
  confirm.hidden = false;
  setTimeout(function () {
    confirm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 50);
}
```

---

## config.js — структура

```javascript
window.WEDDING_CONFIG = {
  // имена, даты, подписи, тексты секций
  // используются через data-text="путь.к.ключу" в HTML
};

window.RSVP_CONFIG = {
  guests: [
    { id: 'guest1', name: 'Имя Фамилия', events: ['day1', 'day2'] },
    // ...
  ],
  plusOneAllowed: true,   // показывать ли кнопку «Добавить гостя»
  plusOneEvents:  ['day2'], // на какие мероприятия регистрируют +1
};
```

---

## Ключевые CSS-паттерны

### Loader — заливка сердечка снизу вверх

```css
/* КРИТИЧНО: РАЗДЕЛЬНЫЕ правила, не комбинированный селектор */
.loader__heart-track {
  position: absolute; inset: 0;
  mask-image: url('assets/icons/heart-3.svg');
  mask-size: var(--hw) var(--hh);
  mask-repeat: no-repeat;
  mask-position: center;
  background: color-mix(in srgb, var(--color-accent) 18%, var(--color-bg));
}

.loader__heart-fill {
  position: absolute;
  bottom: 0; left: 0; right: 0;   /* НЕТ top: — иначе height: 0% не работает */
  height: 0%;
  mask-image: url('assets/icons/heart-3.svg');
  mask-size: var(--hw) var(--hh);
  mask-repeat: no-repeat;
  mask-position: bottom center;   /* якорь снизу */
  background: var(--color-accent);
  will-change: height;
}
```

### Кнопки + reveal (переопределение переходов)

```css
/* .btn — базовые переходы */
.btn {
  transition: background 0.3s ease, color 0.3s ease, opacity 0.3s ease, outline-color 0.3s ease;
}

/* Hover-эффект для основной кнопки */
.btn:hover {
  background: color-mix(in srgb, var(--color-accent), white 12%);
}

/* Active/focus — затемнение */
.btn:focus-visible,
.btn:active {
  background: color-mix(in srgb, var(--color-accent), black 14%);
}

/* Secondary */
.btn_secondary:focus-visible,
.btn_secondary:active {
  background: var(--color-accent);
  color: var(--color-bg);
}

/* КРИТИЧНО: после .reveal.is-visible — перезаписываем transition */
.btn.reveal {
  transition:
    background    0.3s ease,
    color         0.3s ease,
    outline-color 0.3s ease,
    opacity       0.9s cubic-bezier(0.19, 1, 0.22, 1),
    transform     0.9s cubic-bezier(0.19, 1, 0.22, 1);
}
```

### Пилюли (accessible pills)

```css
/* sr-only скрытый input + видимый label */
.pill {
  display: inline-flex;
  align-items: center;
  line-height: 1;
  padding: 7px 14px;
  border-radius: var(--radius-pill);
  border: 1.5px solid var(--color-accent);
  color: var(--color-accent);
  font-size: 15px;
  transition: background 0.3s ease, color 0.3s ease;
}

.sr-only:checked + .pill {
  background: var(--color-accent);
  color: var(--color-bg);
}
```

### RSVP: экран «Спасибо»

```css
.rsvp--done .container > *:not(.rsvp-form),
.rsvp--done .rsvp-form > *:not(.rsvp-confirm) {
  display: none;
}

.rsvp-confirm {
  background: rgba(255, 255, 255, 0.55);
  border-radius: var(--radius-lg);
  padding: var(--space-lg) var(--space-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  animation: rsvpConfirmIn 0.7s cubic-bezier(0.19, 1, 0.22, 1) both;
}
```

### Music gate — без синей вспышки при тапе

```css
.music-gate {
  -webkit-tap-highlight-color: transparent;
  /* ... */
}
```

### iOS: предотвращение зума на инпутах

```css
.rsvp-input {
  font-size: 16px; /* < 16px вызывает автозум iOS */
}
```

---

## HTML-структуры ключевых компонентов

### Loader

```html
<div class="loader" id="loader">
  <div class="loader__heart-wrap">
    <div class="loader__heart-track"></div>
    <div class="loader__heart-fill" id="loaderFill"></div>
    <span class="loader__percent" id="loaderPercent">0%</span>
  </div>
  <p class="loader__text" id="loaderText">Загрузка.</p>
</div>
```

### Music gate

```html
<div class="music-gate" id="musicGate">
  <div class="gate__heart-wrap">
    <div class="gate__heart-bg"></div>
    <p class="gate__text">Нажмите,<br>чтобы открыть<br>приглашение</p>
  </div>
</div>
```

### Карусель дресс-кода

```html
<div class="carousel reveal" role="region" aria-label="Примеры образов">
  <figure class="polaroid polaroid--tilt-small carousel__polaroid">
    <div class="carousel__photos">
      <img class="carousel__slide is-active" src="..." alt="Пример образа 1">
      <img class="carousel__slide" src="..." alt="...">
      <!-- ещё слайды -->
      <button class="carousel__btn carousel__btn--prev" aria-label="Предыдущий образ">&#8249;</button>
      <button class="carousel__btn carousel__btn--next" aria-label="Следующий образ">&#8250;</button>
    </div>
    <figcaption class="polaroid__caption carousel__counter" aria-live="polite">1 / 4</figcaption>
  </figure>
</div>
```

### RSVP-форма

```html
<form class="rsvp-form" id="rsvp-form" novalidate>
  <div class="rsvp-form__list reveal" id="rsvp-guest-list"></div>
  <button type="button" class="btn btn_secondary rsvp-form__add-btn reveal" id="rsvp-add-btn">
    + Добавить гостя
  </button>
  <button type="submit" class="btn rsvp-form__submit reveal">Отправить анкету</button>
  <div class="rsvp-confirm" id="rsvp-confirm" hidden>
    <div class="rsvp-confirm__heart"></div>
    <p class="rsvp-confirm__title">Спасибо!</p>
    <p class="rsvp-confirm__text">Анкета получена. ...</p>
  </div>
</form>
```

---

## Известные баги и их исправления

| Баг | Причина | Исправление |
|-----|---------|-------------|
| Заливка сердечка начинается сверху | Комбинированный селектор `.loader__heart-track, .loader__heart-fill { inset: 0 }` добавлял `top: 0` к `.fill`, из-за чего `height: 0%` не работало | Разделить правила; у `.loader__heart-fill` — только `bottom: 0; left: 0; right: 0; height: 0%` (без `top`) |
| Кнопки не анимируются при hover/active | `.reveal` (позже в CSS) перебивал transition кнопок, оставляя только `opacity` и `transform` | Добавить `.btn.reveal` после `.reveal.is-visible` с объединёнными transition |
| Синяя вспышка на music gate при тапе | Браузерный `-webkit-tap-highlight-color` | Добавить `-webkit-tap-highlight-color: transparent` на `.music-gate` |
| Зум страницы при фокусе на инпут (iOS) | `font-size: 15px` — iOS зумирует при значении < 16px | Изменить на `font-size: 16px` для `.rsvp-input` |
| Хаптик не работает в анимациях/setTimeout | Браузеры блокируют Haptics/Web Audio вне синхронного обработчика жеста | Убрать все хаптики вне click/change-обработчиков |
| Кнопка «Добавить гостя» не возвращается | Не было обработчика на кнопке удаления карточки | Добавить `removeBtn.addEventListener('click', () => addBtn.style.display = '')` |

---

## Правила работы с проектом

1. **Не трогать `config.js` без явного запроса** — там персональные данные гостей.
2. **Спрашивать перед исправлением неоднозначностей** в персональном контенте (тексты, имена).
3. **Никакого npm/node** — проект должен открываться как `file://` или простым static-сервером.
4. **CSS-порядок важен** — `.btn.reveal` должен идти после `.reveal` и `.reveal.is-visible`.
5. **Хаптик только в синхронных жестах** — никаких `setTimeout`, `IntersectionObserver`, `setInterval`.
6. **Маска сердечка** — всегда проверять, что у `.fill`-элемента нет `top` или `inset`.
