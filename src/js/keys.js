import Key from './Key'

const exceptionsArray = ['Backspase', 'TAB', 'DEL', 'CAPS', 'Enter', 'Shift', 'Ctrl', 'Alt', 'Space', 'Up', 'Left', 'Down', 'Right'];

const keyNamesArray = [
  'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspase',
  'TAB', 'KeyQ', 'keyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'DEL',
  'CAPS', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'Shift', 'Backslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'Up', 'ShiftRight',
  'Ctrl', 'Alt', 'Space', 'AltRight', 'CtrlRight', 'Left', 'Down', 'Right',
];

const rusKeyboardArray = [
  'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '',
  'TAB', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'DEL',
  'CAPS', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
  'Shift', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '', 'Shift',
  'Ctrl', 'Alt', ' ', 'Alt', 'Ctrl', '', '', '',
];

const engKeyboardArray = [
  '~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '',
  'TAB', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'DEL',
  'CAPS', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
  'Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '', 'Shift',
  'Ctrl', 'Alt', '', 'Alt', 'Ctrl', '', '', '',
];

const fullKeyboard = [];
const firstRow = [];
const secondRow = [];
const thirdRow = [];
const fourthRow = [];
const fifthRow = [];

for (let i = 0; i < keyNamesArray.length; i += 1) {
  const newKey = new Key(keyNamesArray[i], ['eng', 'rus'], engKeyboardArray[i], rusKeyboardArray[i]);
  fullKeyboard.push(newKey);
}

for (let i = 0; i <= 13; i += 1) {
  firstRow.push(fullKeyboard[i]);
}
for (let i = 14; i <= 27; i += 1) {
  secondRow.push(fullKeyboard[i]);
}
for (let i = 28; i <= 40; i += 1) {
  thirdRow.push(fullKeyboard[i]);
}
for (let i = 41; i <= 54; i += 1) {
  fourthRow.push(fullKeyboard[i]);
}
for (let i = 55; i <= 62; i += 1) {
  fifthRow.push(fullKeyboard[i]);
}

export default {
  firstRow, secondRow, thirdRow, fourthRow, fifthRow,
};
