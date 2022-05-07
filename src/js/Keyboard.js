export default class Keyboard {
  constructor(container, keyboardArray, textarea) {
    this.keyboardArray = keyboardArray;
    this.container = container;
    this.textarea = textarea;
    this.capsLock = false;
    this.shiftIsPressed = false;
    this.outputString = '';
    this.controlIsPressed = false;
    this.altIsPressed = false;

    this.exceptionsArray = ['Backspase', 'TAB', 'DEL', 'CAPS', 'Enter', 'Shift', 'Ctrl', 'Alt', 'Space', 'Up', 'Left', 'Down', 'Right'];
  }

  createKeyRow(documentRow, ElementsRow, noCapsKeysArray) {
    for (let i = 0; i < ElementsRow.length; i += 1) {
      const keyElement = document.createElement('div');
      keyElement.classList.add('keyboard__key', ElementsRow[i].name);

      for (let j = 0; j < ElementsRow[i].languages.length; j += 1) {
        const language = ElementsRow[i].languages[j];
        let content;

        // тут определяем какой язык и присваиваем соответствущее значение экземпляра Key
        if (language === 'eng') {
          content = ElementsRow[i].engKey;
        } else if (language === 'rus') {
          content = ElementsRow[i].rusKey;
        }

        const newSpan = document.createElement('span');
        newSpan.classList.add(language);

        // временно спрячем русский язык
        if (language === 'rus') {
          newSpan.classList.add('hidden');
        }

        // создаем lowerCase Span
        const lowerCaseSpan = document.createElement('span');
        lowerCaseSpan.classList.add('lowerCase', 'currentKeyValue');
        lowerCaseSpan.innerHTML = content;
        newSpan.append(lowerCaseSpan);

        // создаем shifted Span
        const shiftedSpan = document.createElement('span');
        shiftedSpan.classList.add('shifted', 'hidden');
        shiftedSpan.innerHTML = noCapsKeysArray
          .includes(content) ? content : content.toUpperCase();
        newSpan.append(shiftedSpan);

        // создаем caps Span
        const capsSpan = document.createElement('span');
        capsSpan.classList.add('caps', 'hidden');
        capsSpan.innerHTML = noCapsKeysArray.includes(content) ? content : content.toUpperCase();
        newSpan.append(capsSpan);

        // создаем shiftPlusCaps Span
        const shiftedCaps = document.createElement('span');
        shiftedCaps.classList.add('shiftPlusCaps', 'hidden');
        shiftedCaps.innerHTML = content;
        newSpan.append(shiftedCaps);

        keyElement.append(newSpan);
      }

      documentRow.append(keyElement);

      // добавляем listener для каждого элемента

      switch (ElementsRow[i].name) {
        case 'Backspace':
          keyElement.addEventListener('mousedown', () => {
            this.outputString = this.outputString.substring(0, this.outputString.length - 1);
            this.textarea.value = this.textarea.value.substring(0, this.textarea.value.length - 1);
            keyElement.classList.add('pressed');
          });
          keyElement.addEventListener('mouseup', () => {
            keyElement.classList.remove('pressed');
          });
          break;

        case 'Enter':
          keyElement.addEventListener('mousedown', () => {
            this.outputString += '\n';
            this.textarea.value += '\n';
            keyElement.classList.add('pressed');
          });
          keyElement.addEventListener('mouseup', () => {
            keyElement.classList.remove('pressed');
          });
          break;

        case 'Tab':
          keyElement.addEventListener('mousedown', () => {
            this.outputString += '    ';
            this.textarea.value += '    ';
            keyElement.classList.add('pressed');
          });
          keyElement.addEventListener('mouseup', () => {
            keyElement.classList.remove('pressed');
          });
          break;

        case 'ShiftLeft':
        case 'ShiftRight':
          keyElement.addEventListener('mousedown', () => {
            this.shiftIsPressed = true;
            keyElement.classList.add('pressed');
            this.keyboardReInit('eng');
          });
          keyElement.addEventListener('mouseup', () => {
            this.shiftIsPressed = false;
            this.keyboardReInit('eng');
            keyElement.classList.remove('pressed');
          });
          break;

        case 'CapsLock':
          keyElement.addEventListener('click', () => {
            this.capsLock = !this.capsLock;
            keyElement.classList.toggle('pressed');
            this.keyboardReInit('eng');
          });
          break;

        case 'ControlLeft':
        case 'ControlRight':
          keyElement.addEventListener('mousedown', () => {
            this.controlIsPressed = true;
            keyElement.classList.add('pressed');
            // console.log('controlIsPressed = ', this.controlIsPressed);
          });
          keyElement.addEventListener('mouseup', () => {
            this.controlIsPressed = false;
            keyElement.classList.remove('pressed');
            // console.log('controlIsPressed = ', this.controlIsPressed);
          });
          break;

        default:
          keyElement.addEventListener('mousedown', () => {
            let currentKeyValue = keyElement.querySelector('.currentKeyValue');
            currentKeyValue = currentKeyValue.innerHTML;
            this.outputString += currentKeyValue;
            this.textarea.value += currentKeyValue;
            keyElement.classList.add('pressed');
          });
          keyElement.addEventListener('mouseup', () => {
            keyElement.classList.remove('pressed');
          });
      }
    }
  }

  init() {
    for (let i = 0; i < 5; i += 1) {
      const newDiv = document.createElement('div');
      newDiv.classList.add(`keyboard__row-${i + 1}`);
      this.container.append(newDiv);
      const keyboardRowArray = document.querySelector(`.keyboard__row-${i + 1}`);
      this.createKeyRow(keyboardRowArray, this.keyboardArray[i], this.exceptionsArray);
    }

    this.keyboardHandler();
  }

  keyboardHandler() {
    document.addEventListener('keydown', (event) => {
      const activeKey = document.querySelector(`.${event.code}`);
      activeKey.classList.add('pressed');
      const calledKey = activeKey.querySelector('.currentKeyValue');
      const content = calledKey.innerHTML;
      switch (event.code) {
        case 'Backspace':
          this.outputString = this.outputString.substring(0, this.outputString.length - 1);
          this.textarea.value = this.textarea.value.substring(0, this.textarea.value.length - 1);
          break;
        case 'Enter':
          event.preventDefault();
          this.outputString += '\n';
          this.textarea.value += '\n';
          break;
        case 'Space':
          event.preventDefault();
          this.outputString += ' ';
          this.textarea.value += ' ';
          break;
        case 'Tab':
          event.preventDefault();
          this.outputString += '    ';
          this.textarea.value += '    ';
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.shiftIsPressed = true;
          this.keyboardReInit('eng');
          break;
        case 'CapsLock':
          this.capsLock = true;
          this.keyboardReInit('eng');
          break;
        default:
          this.outputString += content;
          this.textarea.value += content;
      }
    });
    document.addEventListener('keyup', (event) => {
      const activeKey = document.querySelector(`.${event.code}`);
      activeKey.classList.remove('pressed');
      switch (event.code) {
        case 'ShiftLeft':
        case 'ShiftRight':
          this.shiftIsPressed = false;
          this.keyboardReInit('eng');
          break;
        case 'CapsLock':
          this.capsLock = false;
          this.keyboardReInit('eng');
          break;
        default:
      }
    });
  }

  keyboardReInit(chosenLanguage) {
    const keyArray = this.container.querySelectorAll('.keyboard__key');
    for (let i = 0; i < keyArray.length; i += 1) {
      const shownKey = keyArray[i].querySelector('.currentKeyValue');
      shownKey.classList.remove('currentKeyValue');
      shownKey.classList.add('hidden');
      let newKeyToShow = keyArray[i].querySelector(`.${chosenLanguage}`);

      if (this.shiftIsPressed && !this.capsLock) {
        newKeyToShow = newKeyToShow.querySelector('.shifted');
        newKeyToShow.classList.remove('hidden');
        newKeyToShow.classList.add('currentKeyValue');
      } else if (!this.shiftIsPressed && this.capsLock) {
        newKeyToShow = newKeyToShow.querySelector('.caps');
        newKeyToShow.classList.remove('hidden');
        newKeyToShow.classList.add('currentKeyValue');
      } else if (this.shiftIsPressed && this.capsLock) {
        newKeyToShow = newKeyToShow.querySelector('.shiftPlusCaps');
        newKeyToShow.classList.remove('hidden');
        newKeyToShow.classList.add('currentKeyValue');
      } else {
        newKeyToShow = newKeyToShow.querySelector('.lowerCase');
        newKeyToShow.classList.remove('hidden');
        newKeyToShow.classList.add('currentKeyValue');
      }
    }
  }
}
