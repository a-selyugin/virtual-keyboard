import Key from './Key';

const keyNamesArray = [
  'IntlBackslash', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'DEL',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'ShiftLeft', 'Backslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
  'ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
];

const rusKeyboardArray = [
  'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '',
  'TAB', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'DEL',
  'CAPS', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
  'Shift', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift',
  'Ctrl', 'Alt', ' ', 'Alt', 'Ctrl', '←', '↓', '→',
];

const engKeyboardArray = [
  '~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '',
  'TAB', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'DEL',
  'CAPS', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
  'Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift',
  'Ctrl', 'Alt', '', 'Alt', 'Ctrl', '←', '↓', '→',
];

const fullKeyboard = [];

for (let i = 0; i < keyNamesArray.length; i += 1) {
  const newKey = new Key(keyNamesArray[i], ['eng', 'rus'], engKeyboardArray[i], rusKeyboardArray[i]);
  fullKeyboard.push(newKey);
}

const keyboardArray = [];

for (let i = 0; i < 5; i += 1) {
  keyboardArray.push([]);
}

for (let i = 0; i <= 13; i += 1) {
  keyboardArray[0].push(fullKeyboard[i]);
}

for (let i = 14; i <= 27; i += 1) {
  keyboardArray[1].push(fullKeyboard[i]);
}

for (let i = 28; i <= 40; i += 1) {
  keyboardArray[2].push(fullKeyboard[i]);
}

for (let i = 41; i <= 54; i += 1) {
  keyboardArray[3].push(fullKeyboard[i]);
}

for (let i = 55; i <= 62; i += 1) {
  keyboardArray[4].push(fullKeyboard[i]);
}

export default {
  keyboardArray,
};
