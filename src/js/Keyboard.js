export default class Keyboard {
  constructor(name) {
    this.name = name;
    this.capsLock = false;
    this.shiftIsPressed = false;
    this.outputString = '';
  }
}
