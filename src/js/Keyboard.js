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
    this.languagesArray = ['eng', 'rus'];
    this.currentLanguage = localStorage.language ? localStorage.language : 'eng';
    this.languageIsChanged = false;
    this.excludedFromScreenKeyboard = ['MetaLeft', 'MetaRight', 'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
  }

  createKeyRow(documentRow, ElementsRow) {
    // метод создания ряда клавиатуры, при создании страницы
    for (let i = 0; i < ElementsRow.length; i += 1) {
      const keyElement = document.createElement('div');
      keyElement.classList.add('keyboard__key', ElementsRow[i].name);

      const engSpan = document.createElement('span');
      engSpan.classList.add('eng');

      const rusSpan = document.createElement('span');
      rusSpan.classList.add('rus');
      let currentLanguage;
      if (this.currentLanguage === 'eng') {
        rusSpan.classList.add('hidden');
        engSpan.classList.add('currentLanguage');
        currentLanguage = engSpan;
      } else {
        engSpan.classList.add('hidden');
        rusSpan.classList.add('currentLanguage');
        currentLanguage = rusSpan;
      }

      const engProps = Object.entries(ElementsRow[i].eng);
      const rusProps = Object.entries(ElementsRow[i].rus);

      for (let j = 0; j < engProps.length; j += 1) {
        const engSpanItem = document.createElement('span');
        const content = engProps[j][1];

        engSpanItem.classList.add(engProps[j][0]);

        if ((engProps[j][0] === 'lowerCase') && currentLanguage === engSpan) {
          engSpanItem.classList.add('currentKeyValue');
        } else {
          engSpanItem.classList.add('hidden');
        }
        engSpanItem.innerHTML = content;

        engSpan.append(engSpanItem);
      }

      for (let j = 0; j < rusProps.length; j += 1) {
        const rusSpanItem = document.createElement('span');
        const content = rusProps[j][1];

        rusSpanItem.classList.add(rusProps[j][0]);

        if ((engProps[j][0] === 'lowerCase') && currentLanguage === rusSpan) {
          rusSpanItem.classList.add('currentKeyValue');
        } else {
          rusSpanItem.classList.add('hidden');
        }

        if (content) {
          rusSpanItem.innerHTML = content;
        }
        rusSpan.append(rusSpanItem);
      }

      keyElement.append(engSpan);
      keyElement.append(rusSpan);

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
            this.keyboardReInit(this.currentLanguage);
          });
          keyElement.addEventListener('mouseup', () => {
            this.shiftIsPressed = false;
            this.keyboardReInit(this.currentLanguage);
            keyElement.classList.remove('pressed');
          });
          break;

        case 'CapsLock':
          keyElement.addEventListener('click', () => {
            this.capsLock = !this.capsLock;
            keyElement.classList.toggle('pressed');
            this.keyboardReInit(this.currentLanguage);
          });
          break;

        case 'ControlLeft':
        case 'ControlRight':
          keyElement.addEventListener('mousedown', () => {
            this.controlIsPressed = true;
            keyElement.classList.add('pressed');
            if (this.altIsPressed) {
              this.changeLanguage();
              this.keyboardReInit(this.currentLanguage);
            }
          });
          keyElement.addEventListener('mouseup', () => {
            this.controlIsPressed = false;
            keyElement.classList.remove('pressed');
          });
          break;

        case 'AltRight':
        case 'AltLeft':
          keyElement.addEventListener('mousedown', () => {
            this.altIsPressed = true;
            keyElement.classList.add('pressed');
            if (this.shiftIsPressed) {
              this.changeLanguage();
              this.keyboardReInit(this.currentLanguage);
            }
          });
          keyElement.addEventListener('mouseup', () => {
            this.altIsPressed = false;
            keyElement.classList.remove('pressed');
          });
          break;

        default:
          keyElement.addEventListener('mousedown', () => {
            let currentKeyValue = keyElement.querySelector('.currentKeyValue');
            currentKeyValue = currentKeyValue.textContent;
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
      this.createKeyRow(keyboardRowArray, this.keyboardArray[i]);
    }

    this.keyboardHandler();
  }

  keyboardHandler() {
    // создаем листенер для нажатий на клавиши и обрабатываем разные события
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      // обаратываем клавиши, которых нет на экранной клавиатуре
      if (this.excludedFromScreenKeyboard.includes(event.code)) {
        console.log('This button is not present on screen keyboard');
        return;
      }
      const activeKey = document.querySelector(`.${event.code}`);
      activeKey.classList.add('pressed');
      const calledKey = activeKey.querySelector('.currentKeyValue');
      const content = calledKey.textContent;
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
          this.keyboardReInit(this.currentLanguage);
          break;
        case 'CapsLock':
          this.capsLock = true;
          this.keyboardReInit(this.currentLanguage);
          break;
        case 'ControlLeft':
        case 'ControlRight':
          this.controlIsPressed = true;
          if (this.altIsPressed) {
            this.changeLanguage();
            this.keyboardReInit(this.currentLanguage);
          }
          break;
        case 'AltLeft':
        case 'AltRight':
          this.altIsPressed = true;
          if (this.controlIsPressed) {
            this.changeLanguage();
            this.keyboardReInit(this.currentLanguage);
          }
          break;
        default:
          this.outputString += content;
          this.textarea.value += content.toString();
      }
    });
    // вешаем листенер на поднятие клавиши
    document.addEventListener('keyup', (event) => {
      if (this.excludedFromScreenKeyboard.includes(event.code)) {
        return;
      }
      const activeKey = document.querySelector(`.${event.code}`);
      activeKey.classList.remove('pressed');
      switch (event.code) {
        case 'ShiftLeft':
        case 'ShiftRight':
          this.shiftIsPressed = false;
          this.keyboardReInit(this.currentLanguage);
          break;
        case 'CapsLock':
          this.capsLock = false;
          this.keyboardReInit(this.currentLanguage);
          break;
        case 'ControlLeft':
        case 'ControlRight':
          this.controlIsPressed = false;
          break;
        case 'AltLeft':
        case 'AltRight':
          this.altIsPressed = false;
          break;
        default:
      }
    });
  }

  keyboardReInit(chosenLanguage) {
    // определяем с какого языка мы переключились, это может быть полезно,
    // если языков больше, чем 2

    let previousLanguage;
    const indexOfChosenLanguage = this.languagesArray.indexOf(chosenLanguage);
    if (indexOfChosenLanguage === 0) {
      previousLanguage = this.languagesArray[this.languagesArray.length - 1];
    } else {
      previousLanguage = this.languagesArray[indexOfChosenLanguage - 1];
    }

    const keyArray = this.container.querySelectorAll('.keyboard__key');
    for (let i = 0; i < keyArray.length; i += 1) {
      let newKeyToShow = keyArray[i].querySelector(`.${chosenLanguage}`);
      const keyToHide = keyArray[i].querySelector(`.${previousLanguage}`);
      // проверяем был ли сменен язык
      if (this.languageIsChanged) {
        newKeyToShow.classList.toggle('hidden');
        newKeyToShow.classList.toggle('currentLanguage');

        keyToHide.classList.toggle('hidden');
        keyToHide.classList.toggle('currentLanguage');
      }

      const shownKey = keyArray[i].querySelector('.currentKeyValue');
      shownKey.classList.remove('currentKeyValue');
      shownKey.classList.add('hidden');
      // перерисовываем клавиши, в зависимости от выбранного регистра
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
    this.languageIsChanged = false;
  }

  changeLanguage() {
    const arrIndex = this.languagesArray.indexOf(this.currentLanguage);
    if (arrIndex < (this.languagesArray.length - 1)) {
      this.currentLanguage = this.languagesArray[arrIndex + 1];
    } else {
      [this.currentLanguage] = this.languagesArray;
    }
    localStorage.language = this.currentLanguage;
    this.languageIsChanged = true;
  }
}
