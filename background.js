/**
 * Registers IME.
 */

var ime_api = chrome.input.ime;

var context_id = -1;

console.log("Initializing IME");

var workman_map = {
        'w': 'd',
        'e': 'r',
        'r': 'w',
        't': 'b',
        'y': 'j',
        'u': 'f',
        'i': 'u',
        'o': 'p',
        'p': ';',
        'P': ':',
        'd': 'h',
        'f': 't',
        'h': 'y',
        'j': 'n',
        'k': 'e',
        'l': 'o',
        ';': 'i',
        ':': 'I',
        'c': 'm',
        'v': 'c',
        'b': 'v',
        'n': 'k',
        'm': 'l',
        '1': '!',
        '2': '@',
        '3': '#',
        '4': '$',
        '5': '%',
        '6': '^',
        '7': '&',
        '8': '*',
        '9': '(',
        '0': ')',
        '!': '1',
        '@': '2',
        '#': '3',
        '$': '4',
        '%': '5',
        '^': '6',
        '&': '7',
        '*': '8',
        '(': '9',
        ')': '0',
};

ime_api.onFocus.addListener(function(context) {
  console.log('onFocus:' + context.contextID);
  context_id = context.contextID;
});
ime_api.onBlur.addListener(function(contextID) {
  console.log('onBlur:' + contextID);
  context_id = -1;
});

ime_api.onActivate.addListener(function(engineID) {
  console.log('onActivate:' + engineID);
});
ime_api.onDeactivated.addListener(function(engineID) {
  console.log('onDeactivated:' + engineID);
});

ime_api.onKeyEvent.addListener(
function(engineID, keyData) {
  console.log('onKeyEvent:' + keyData.key + " code: " + keyData.code + " context: " + context_id);
  if (keyData.type === "keydown") {
    var newKey;
    var oldKey = keyData.key;
    if (oldKey in workman_map) {
        // Exact matches for symbols and lowercase
        newKey = workman_map[oldKey];
        chrome.input.ime.commitText({"contextID": context_id,
            "text": newKey});
        return true;
    } else {
        var oldLower = oldKey.toLowerCase();
        if (oldLower in workman_map) {
            if (oldKey === oldKey.toUpperCase()
                    && oldKey !== oldLower) {
                newKey = workman_map[oldLower].toUpperCase();
            } else {
                newKey = workman_map[oldKey];
            }
            chrome.input.ime.commitText({"contextID": context_id,
                "text": newKey});
            return true;
    }
  }

  return false;
});
