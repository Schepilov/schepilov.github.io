var SPREADSHEET_ID = '1L5UfHK-uQgDw1PWSFDrBCXr0Co76UaAK7yxhRfKLr-E';
var ANSWERS_SPREADSHEET_ID = '1F4VoRucV1NecuKRMno2W_vBNyPnxh4Qm081rh0oILg4';

function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : '';
    var token = (e && e.parameter && e.parameter.token) ? String(e.parameter.token).trim() : '';

    if (action !== 'invite') {
      return jsonOutput({
        ok: false,
        error: 'Unknown action'
      });
    }

    if (!token) {
      return jsonOutput({
        ok: false,
        error: 'Token is required'
      });
    }

    var invite = getInviteByToken(token);

    if (!invite) {
      return jsonOutput({
        ok: false,
        error: 'Invite not found'
      });
    }

    var response = getLatestResponseByToken(token);

    return jsonOutput({
      ok: true,
      invite: invite,
      response: response
    });

  } catch (err) {
    return jsonOutput({
      ok: false,
      error: String(err)
    });
  }
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOutput({
        ok: false,
        error: 'Empty request body'
      });
    }

    var body = JSON.parse(e.postData.contents || '{}');
    var action = String(body.action || '').trim();

    if (action !== 'submit_rsvp') {
      return jsonOutput({
        ok: false,
        error: 'Unknown action'
      });
    }

    var token = String(body.token || '').trim();
    if (!token) {
      return jsonOutput({
        ok: false,
        error: 'Token is required'
      });
    }

    var invite = getInviteByToken(token);
    if (!invite) {
      return jsonOutput({
        ok: false,
        error: 'Invite not found'
      });
    }

    var guests = Array.isArray(body.guests) ? body.guests : [];
    if (!guests.length) {
      return jsonOutput({
        ok: false,
        error: 'Guests array is required'
      });
    }

    var saveResult = saveResponse({
      token: token,
      guests: guests
    });

    rebuildAnswersView();

    return jsonOutput({
      ok: true,
      responseId: saveResult.responseId,
      submittedAt: saveResult.submittedAt
    });

  } catch (err) {
    return jsonOutput({
      ok: false,
      error: String(err)
    });
  }
}

function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getAnswersSpreadsheet() {
  return SpreadsheetApp.openById(ANSWERS_SPREADSHEET_ID);
}

function getInviteByToken(token) {
  var sheet = getSpreadsheet().getSheetByName('Invites');
  if (!sheet) throw new Error('Sheet "Invites" not found');

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow < 2) return null;

  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var rows = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var obj = rowToObject(headers, row);

    if (String(obj.token).trim() === token) {
      if (String(obj.status).trim().toLowerCase() !== 'active') {
        return null;
      }

      return {
        token: String(obj.token || ''),
        groupLabel: String(obj.group_label || ''),
        guests: parseJsonSafe(obj.guests_json, []),
        showDay1: toBoolean(obj.show_day1),
        showDinner: toBoolean(obj.show_dinner),
        showDay2: toBoolean(obj.show_day2),
        plusOneAllowed: toBoolean(obj.plus_one_allowed),
        plusOneEvents: parseJsonSafe(obj.plus_one_events_json, []),
        showChat: toBoolean(obj.show_chat)
      };
    }
  }

  return null;
}

function getLatestResponseByToken(token) {
  var sheet = getSpreadsheet().getSheetByName('Responses');
  if (!sheet) throw new Error('Sheet "Responses" not found');

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow < 2) {
    return {
      exists: false,
      data: null
    };
  }

  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var rows = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  for (var i = rows.length - 1; i >= 0; i--) {
    var row = rows[i];
    var obj = rowToObject(headers, row);

    if (String(obj.token).trim() === token && toBoolean(obj.is_latest)) {
      return {
        exists: true,
        responseId: String(obj.response_id || ''),
        submittedAt: String(obj.submitted_at || ''),
        data: parseJsonSafe(obj.payload_json, null)
      };
    }
  }

  return {
    exists: false,
    data: null
  };
}

function saveResponse(payload) {
  var sheet = getSpreadsheet().getSheetByName('Responses');
  if (!sheet) throw new Error('Sheet "Responses" not found');

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var now = new Date();
  var submittedAt = now.toISOString();
  var responseId = Utilities.getUuid();

  if (lastRow >= 2) {
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    var rows = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

    for (var i = rows.length - 1; i >= 0; i--) {
      var row = rows[i];
      var obj = rowToObject(headers, row);

      if (String(obj.token).trim() === payload.token && toBoolean(obj.is_latest)) {
        var realRowIndex = i + 2;
        var isLatestColIndex = headers.indexOf('is_latest') + 1;
        if (isLatestColIndex > 0) {
          sheet.getRange(realRowIndex, isLatestColIndex).setValue(false);
        }
      }
    }
  }

  sheet.appendRow([
    responseId,
    payload.token,
    true,
    submittedAt,
    JSON.stringify(payload)
  ]);

  return {
    responseId: responseId,
    submittedAt: submittedAt
  };
}

function rowToObject(headers, row) {
  var obj = {};
  for (var i = 0; i < headers.length; i++) {
    obj[String(headers[i]).trim()] = row[i];
  }
  return obj;
}

function parseJsonSafe(value, fallback) {
  try {
    if (value === '' || value === null || value === undefined) return fallback;
    return JSON.parse(value);
  } catch (e) {
    return fallback;
  }
}

function toBoolean(value) {
  if (value === true) return true;
  if (value === false) return false;

  var str = String(value).trim().toLowerCase();
  return str === 'true' || str === 'истина' || str === '1' || str === 'yes';
}

function jsonOutput(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function testSaveResponse() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        action: 'submit_rsvp',
        token: 'test-alex-ksusha',
        guests: [
          {
            guestId: 'g1',
            name: 'Александр Щепилов',
            isPlusOne: false,
            attendance: {
              day1: 'yes',
              day2: 'yes'
            },
            party: {
              hot: 'fish',
              allergy: 'no',
              allergens: [],
              allergensCustom: '',
              intolerances: [],
              intolerancesCustom: ''
            }
          },
          {
            guestId: 'g2',
            name: 'Ксения Рыдаева',
            isPlusOne: false,
            attendance: {
              day1: 'yes',
              dinner: 'yes',
              day2: 'yes'
            },
            party: {
              hot: 'meat',
              allergy: 'no',
              allergens: [],
              allergensCustom: '',
              intolerances: [],
              intolerancesCustom: ''
            }
          }
        ]
      })
    }
  };

  var result = doPost(fakeEvent);
  Logger.log(result.getContent());
}

function rebuildAnswersView() {
  var apiSs = getSpreadsheet();
  var answersSs = getAnswersSpreadsheet();

  var invitesSheet = apiSs.getSheetByName('Invites');
  var responsesSheet = apiSs.getSheetByName('Responses');
  var answersSheet = answersSs.getSheetByName('Ответы гостей');

  if (!invitesSheet) throw new Error('Sheet "Invites" not found');
  if (!responsesSheet) throw new Error('Sheet "Responses" not found');
  if (!answersSheet) throw new Error('Sheet "Ответы гостей" not found');

  var invitesMap = buildInvitesMap(invitesSheet);
  var latestResponses = getLatestResponses(responsesSheet);

  var output = [];
  latestResponses.forEach(function (item) {
    var token = item.token;
    var submittedAt = item.submittedAt;
    var payload = item.payload || {};
    var invite = invitesMap[token] || {};
    var groupLabel = String(invite.group_label || '');

    var guests = Array.isArray(payload.guests) ? payload.guests : [];
    guests.forEach(function (guest) {
      var party = guest.party || {};
      output.push([
          String(guest.name || ''),
          groupLabel,
          token,
          formatMoscowDateTime(submittedAt),
          guest.isPlusOne ? 'да' : 'нет',
          mapAttendanceValueWithInviteCheck(guest, 'day1'),
          mapAttendanceValueWithInviteCheck(guest, 'dinner'),
          mapAttendanceValueWithInviteCheck(guest, 'day2'),
          mapDrinksValue(party.drinks),
          mapHotValue(party.hot),
          mapFoodFlag(party),
          joinListRussianAllergens(party.allergens),
          String(party.allergensCustom || ''),
          joinListRussianIntolerances(party.intolerances),
          String(party.intolerancesCustom || '')
        ]);
    });
  });

  clearAnswersSheetKeepHeader(answersSheet);

  if (output.length > 0) {
    answersSheet
      .getRange(2, 1, output.length, output[0].length)
      .setValues(output);
  }
}

function buildInvitesMap(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var map = {};

  if (lastRow < 2) return map;

  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var rows = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  rows.forEach(function (row) {
    var obj = rowToObject(headers, row);
    var token = String(obj.token || '').trim();
    if (!token) return;
    map[token] = obj;
  });

  return map;
}

function getLatestResponses(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var result = [];

  if (lastRow < 2) return result;

  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var rows = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  rows.forEach(function (row) {
    var obj = rowToObject(headers, row);
    if (!toBoolean(obj.is_latest)) return;

    result.push({
      token: String(obj.token || '').trim(),
      submittedAt: String(obj.submitted_at || ''),
      payload: parseJsonSafe(obj.payload_json, {})
    });
  });

  return result;
}

function clearAnswersSheetKeepHeader(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow <= 1 || lastCol < 1) return;

  sheet.getRange(2, 1, lastRow - 1, lastCol).clearContent();
}

function joinList(value) {
  if (!Array.isArray(value) || value.length === 0) return '';
  return value.join(', ');
}

function mapAttendanceValue(value) {
  if (value === 'yes') return 'будет';
  if (value === 'no') return 'не будет';
  return '';
}

function mapHotValue(value) {
  if (value === 'meat') return 'мясо';
  if (value === 'fish') return 'рыба';
  return '';
}

function mapFoodFlag(party) {
  var hasAllergens = Array.isArray(party.allergens) && party.allergens.length > 0;
  var hasAllergensCustom = !!String(party.allergensCustom || '').trim();
  var hasIntolerances = Array.isArray(party.intolerances) && party.intolerances.length > 0;
  var hasIntolerancesCustom = !!String(party.intolerancesCustom || '').trim();

  return (hasAllergens || hasAllergensCustom || hasIntolerances || hasIntolerancesCustom) ? 'есть' : 'нет';
}

function formatMoscowDateTime(value) {
  if (!value) return '';

  var date = new Date(value);
  if (isNaN(date.getTime())) return String(value);

  return Utilities.formatDate(date, 'Europe/Moscow', 'dd.MM.yyyy HH:mm:ss');
}

function mapDrinksValue(value) {
  if (!Array.isArray(value) || value.length === 0) return '';

  var dict = {
    soft: 'безалкогольные',
    white_wine: 'белое вино',
    red_wine: 'красное вино',
    sparkling: 'игристое',
    beer: 'пиво'
  };

  return value.map(function (item) {
    return dict[item] || item;
  }).join(', ');
}

function joinListRussianAllergens(value) {
  if (!Array.isArray(value) || value.length === 0) return '';

  var dict = {
    'орехи': 'орехи',
    'морепродукты': 'морепродукты',
    'яйца': 'яйца',
    'соя': 'соя',
    'цитрусовые': 'цитрусовые',
    'клубника': 'клубника',
    'мёд': 'мёд',
    'шоколад': 'шоколад',
    'рыба': 'рыба',
    'морковь': 'морковь',
    'сельдерей': 'сельдерей'
  };

  return value.map(function (item) {
    return dict[item] || item;
  }).join(', ');
}

function joinListRussianIntolerances(value) {
  if (!Array.isArray(value) || value.length === 0) return '';

  var dict = {
    'лактоза': 'лактоза',
    'глютен': 'глютен',
    'фруктоза': 'фруктоза',
    'гистамин': 'гистамин',
    'сорбит': 'сорбит',
    'казеин': 'казеин'
  };

  return value.map(function (item) {
    return dict[item] || item;
  }).join(', ');
}
function mapAttendanceValueWithInviteCheck(guest, eventKey) {
  var attendance = guest && guest.attendance ? guest.attendance : {};
  var hasEventInAttendance = Object.prototype.hasOwnProperty.call(attendance, eventKey);

  if (!hasEventInAttendance) {
    return 'не звали';
  }

  return mapAttendanceValue(attendance[eventKey]);
}

function generateInviteToken() {
  var invitesSheet = getSpreadsheet().getSheetByName('Invites');
  if (!invitesSheet) throw new Error('Sheet "Invites" not found');

  var existingTokens = getExistingInviteTokens(invitesSheet);
  var alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  var tokenLength = 8;

  for (var attempt = 0; attempt < 5000; attempt++) {
    var token = randomString(tokenLength, alphabet);
    if (!existingTokens[token]) {
      return token;
    }
  }

  throw new Error('Could not generate unique token');
}

function getExistingInviteTokens(sheet) {
  var lastRow = sheet.getLastRow();
  var tokensMap = {};

  if (lastRow < 2) return tokensMap;

  var values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  values.forEach(function (row) {
    var token = String(row[0] || '').trim();
    if (token) {
      tokensMap[token] = true;
    }
  });

  return tokensMap;
}

function randomString(length, alphabet) {
  var result = '';
  for (var i = 0; i < length; i++) {
    var idx = Math.floor(Math.random() * alphabet.length);
    result += alphabet.charAt(idx);
  }
  return result;
}

function testGenerateInviteToken() {
  Logger.log(generateInviteToken());
}

function fillTokenForSelectedRow() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Не удалось получить активную таблицу');

  var sheet = ss.getActiveSheet();
  if (!sheet) throw new Error('Не удалось получить активный лист');

  if (sheet.getName() !== 'Invites') {
    throw new Error('Сначала открой лист "Invites"');
  }

  var range = sheet.getActiveRange();
  if (!range) {
    throw new Error('Сначала выдели любую ячейку нужной строки');
  }

  var row = range.getRow();

  if (row < 2) {
    throw new Error('Выберите строку приглашения, начиная со 2-й строки');
  }

  fillTokenForRow(row);
}

function buildWeddingMenu() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Wedding API')
    .addItem('Обновить Invites из вкладки Приглашения', 'runRebuildInvitesFromGuestsSheet')
    .addSeparator()
    .addItem('Сгенерировать токен для одной строки', 'runFillTokenForSelectedRow')
    .addItem('Сгенерировать токены для нескольких строк', 'runFillTokensForSelectedRows')
    .addItem('Сгенерировать токен по номеру строки', 'promptFillTokenForRow')
    .addToUi();
}

function onOpen(e) {
  buildWeddingMenu();
}

function installOpenTrigger() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function (trigger) {
    if (trigger.getHandlerFunction() === 'buildWeddingMenu' || trigger.getHandlerFunction() === 'onOpen') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('buildWeddingMenu')
    .forSpreadsheet(ss)
    .onOpen()
    .create();
}

function runFillTokenForSelectedRow() {
  var ui = SpreadsheetApp.getUi();

  try {
    fillTokenForSelectedRow();
    ui.alert('Готово', 'Токен записан в выбранную строку.', ui.ButtonSet.OK);
  } catch (err) {
    ui.alert('Ошибка', String(err), ui.ButtonSet.OK);
  }
}

function promptFillTokenForRow() {
  var ui = SpreadsheetApp.getUi();

  var response = ui.prompt(
    'Сгенерировать токен',
    'Введите номер строки в листе Invites:',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() !== ui.Button.OK) {
    return;
  }

  var row = Number(String(response.getResponseText() || '').trim());

  if (!row || row < 2) {
    ui.alert('Нужно ввести номер строки, начиная со 2-й.');
    return;
  }

  try {
    fillTokenForRow(row);
    ui.alert('Готово', 'Токен записан в строку ' + row + '.', ui.ButtonSet.OK);
  } catch (err) {
    ui.alert('Ошибка', String(err), ui.ButtonSet.OK);
  }
}

function fillTokenForRow(row) {
  var sheet = getSpreadsheet().getSheetByName('Invites');
  if (!sheet) throw new Error('Sheet "Invites" not found');

  if (!row || row < 2) {
    throw new Error('Передай номер строки, начиная со 2-й');
  }

  var tokenCell = sheet.getRange(row, 1);
  var currentToken = String(tokenCell.getValue() || '').trim();

  if (currentToken) {
    throw new Error('В этой строке токен уже заполнен');
  }

  var token = generateInviteToken();
  tokenCell.setValue(token);

  SpreadsheetApp.flush();
  Logger.log('Token set for row ' + row + ': ' + token);
}

function fillTokensForSelectedRows() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Не удалось получить активную таблицу');

  var sheet = ss.getActiveSheet();
  if (!sheet) throw new Error('Не удалось получить активный лист');

  if (sheet.getName() !== 'Invites') {
    throw new Error('Сначала открой лист "Invites"');
  }

  var range = sheet.getActiveRange();
  if (!range) {
    throw new Error('Сначала выдели нужные строки');
  }

  var startRow = range.getRow();
  var numRows = range.getNumRows();

  if (startRow < 2) {
    throw new Error('Выделение должно начинаться не с заголовка, а минимум со 2-й строки');
  }

  var invitesSheet = getSpreadsheet().getSheetByName('Invites');
  if (!invitesSheet) throw new Error('Sheet "Invites" not found');

  var filledRows = [];
  var skippedRows = [];

  for (var i = 0; i < numRows; i++) {
    var row = startRow + i;
    var tokenCell = invitesSheet.getRange(row, 1);
    var currentToken = String(tokenCell.getValue() || '').trim();

    if (currentToken) {
      skippedRows.push(row);
      continue;
    }

    var token = generateInviteToken();
    tokenCell.setValue(token);
    filledRows.push(row);
  }

  SpreadsheetApp.flush();

  return {
    filledRows: filledRows,
    skippedRows: skippedRows
  };
}

function runFillTokensForSelectedRows() {
  var ui = SpreadsheetApp.getUi();

  try {
    var result = fillTokensForSelectedRows();

    var parts = [];

    if (result.filledRows.length) {
      parts.push('Токены созданы для строк: ' + result.filledRows.join(', '));
    }

    if (result.skippedRows.length) {
      parts.push('Пропущены строки, где токен уже был: ' + result.skippedRows.join(', '));
    }

    if (!parts.length) {
      parts.push('Ничего не изменено.');
    }

    ui.alert('Готово', parts.join('\n\n'), ui.ButtonSet.OK);
  } catch (err) {
    ui.alert('Ошибка', String(err), ui.ButtonSet.OK);
  }
}

function rebuildInvitesFromGuestsSheet() {
  var ss = getSpreadsheet();

  var guestsSheet = ss.getSheetByName('Приглашения');
  var invitesSheet = ss.getSheetByName('Invites');

  if (!guestsSheet) throw new Error('Sheet "Приглашения" not found');
  if (!invitesSheet) throw new Error('Sheet "Invites" not found');

  var existingInvitesMap = getExistingInvitesMap(invitesSheet);
  var grouped = groupGuestsSheetRows(guestsSheet);

  var headers = invitesSheet.getRange(1, 1, 1, invitesSheet.getLastColumn()).getValues()[0];
  var rows = [];

  Object.keys(grouped).forEach(function (groupName) {
    var group = grouped[groupName];
    var existing = existingInvitesMap[groupName] || {};

    var token = String(existing.token || '').trim();
    if (!token) {
      token = generateInviteToken();
    }

    var status = String(existing.status || 'active').trim() || 'active';

    rows.push(buildInviteRowByHeaders(headers, {
      token: token,
      group_label: groupName,
      guests_json: JSON.stringify(group.guests),
      show_day1: group.show_day1,
      show_dinner: group.show_dinner,
      show_day2: group.show_day2,
      plus_one_allowed: group.plus_one_allowed,
      plus_one_events_json: JSON.stringify(group.plus_one_events),
      show_chat: group.show_chat,
      status: status,
      updated_at: new Date()
    }));
  });

  clearInvitesSheetKeepHeader(invitesSheet);

  if (rows.length > 0) {
    invitesSheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  }
}

function getExistingInvitesMap(sheet) {
  var map = {};
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow < 2) return map;

  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var rows = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  rows.forEach(function (row) {
    var obj = rowToObject(headers, row);
    var groupLabel = String(obj.group_label || '').trim();
    if (!groupLabel) return;
    map[groupLabel] = obj;
  });

  return map;
}

function groupGuestsSheetRows(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var grouped = {};

  if (lastRow < 2) return grouped;

  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var rows = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  rows.forEach(function (row) {
    var obj = rowToObject(headers, row);

    var groupName = String(obj['Группа'] || '').trim();
    var guestName = String(obj['Гость'] || '').trim();

    if (!groupName || !guestName) return;

    if (!grouped[groupName]) {
      grouped[groupName] = {
        guests: [],
        show_day1: false,
        show_dinner: false,
        show_day2: false,
        plus_one_allowed: false,
        plus_one_events: [],
        show_chat: false
      };
    }

    var entry = grouped[groupName];

    var guestEvents = [];
    if (toBoolean(obj['Роспись'])) guestEvents.push('day1');
    if (toBoolean(obj['Ужин'])) guestEvents.push('dinner');
    if (toBoolean(obj['Праздник'])) guestEvents.push('day2');

    entry.guests.push({
      id: 'g' + (entry.guests.length + 1),
      name: guestName,
      events: guestEvents
    });

    if (toBoolean(obj['Роспись'])) entry.show_day1 = true;
    if (toBoolean(obj['Ужин'])) entry.show_dinner = true;
    if (toBoolean(obj['Праздник'])) entry.show_day2 = true;
    if (toBoolean(obj['Плюсадин'])) entry.plus_one_allowed = true;
    if (toBoolean(obj['Доступ в чат'])) entry.show_chat = true;

    var plusOneEventsRaw = String(obj['Куда можно с +1'] || '').trim();
    if (plusOneEventsRaw) {
      var parsedPlusOneEvents = parsePlusOneEvents(plusOneEventsRaw);
      entry.plus_one_events = uniqueStrings(
        (entry.plus_one_events || []).concat(parsedPlusOneEvents)
      );
    }
  });

  return grouped;
}

function parsePlusOneEvents(value) {
  var normalized = String(value || '')
    .toLowerCase()
    .replace(/\r?\n/g, ',')
    .replace(/[;/|]+/g, ',')
    .replace(/\s*,\s*/g, ',')
    .trim();

  if (!normalized) return [];

  var parts = normalized.split(',');
  var result = [];

  parts.forEach(function (part) {
    var item = String(part || '').trim();
    if (!item) return;

    if (item === 'роспись' || item === 'day1') result.push('day1');
    if (item === 'ужин' || item === 'ресторан' || item === 'dinner') result.push('dinner');
    if (item === 'праздник' || item === 'вечеринка' || item === 'day2') result.push('day2');
  });

  return uniqueStrings(result);
}

function uniqueStrings(arr) {
  var map = {};
  var result = [];

  (arr || []).forEach(function (item) {
    var key = String(item || '').trim();
    if (!key || map[key]) return;
    map[key] = true;
    result.push(key);
  });

  return result;
}

function buildInviteRowByHeaders(headers, data) {
  return headers.map(function (header) {
    var key = String(header || '').trim();
    return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : '';
  });
}

function clearInvitesSheetKeepHeader(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow <= 1 || lastCol < 1) return;

  sheet.getRange(2, 1, lastRow - 1, lastCol).clearContent();
}

function runRebuildInvitesFromGuestsSheet() {
  var ui = SpreadsheetApp.getUi();

  try {
    rebuildInvitesFromGuestsSheet();
    ui.alert('Готово', 'Вкладка Invites обновлена из вкладки Приглашения.', ui.ButtonSet.OK);
  } catch (err) {
    ui.alert('Ошибка', String(err), ui.ButtonSet.OK);
  }
}
