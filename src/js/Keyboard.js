export default class Keyboard {
  constructor(container, keyboardArray, textarea) {
    this.keyboardArray = keyboardArray;
    this.container = container;
    this.textarea = textarea;
    this.capsLock = false;
    this.shiftIsPressed = false;
    this.controlIsPressed = false;
    this.altIsPressed = false;
    this.languagesArray = ['eng', 'rus'];
    this.currentLanguage = localStorage.language ? localStorage.language : 'eng';
    this.languageIsChanged = false;
    this.excludedFromScreenKeyboard = ['MetaLeft', 'MetaRight', 'IntlBackslash', 'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
  }

  addTextToCursor(char) {
    const { textarea } = this;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const resultingText = textarea.value.substring(0, start) + char + textarea.value.substring(end);
    textarea.value = resultingText;
    textarea.focus();
    textarea.selectionEnd = start + char.length;
    textarea.selectionStart = start + char.length;
  }

  backSpaceHandler() {
    const { textarea } = this;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === end) {
      textarea.value = textarea.value.substring(0, start - 1) + textarea.value.substring(start);
      textarea.selectionEnd = start - 1;
      textarea.selectionStart = start - 1;
    } else {
      textarea.value = textarea.value.substring(0, start) + textarea.value.substring(end);
      textarea.selectionEnd = start;
      textarea.selectionStart = start;
    }
    textarea.focus();
  }

  deleteHandler() {
    const { textarea } = this;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === end) {
      textarea.value = textarea.value.substring(0, start) + textarea.value.substring(start + 1);
    } else {
      textarea.value = textarea.value.substring(0, start) + textarea.value.substring(end);
    }
    textarea.focus();
    textarea.selectionEnd = start;
    textarea.selectionStart = start;
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
            this.backSpaceHandler();
            keyElement.classList.add('pressed');
          });
          ['mouseup', 'mouseleave'].forEach((mouseEvent) => {
            keyElement.addEventListener(mouseEvent, () => {
              keyElement.classList.remove('pressed');
              this.textarea.focus();
            });
          });
          break;

        case 'Delete':
          keyElement.addEventListener('mousedown', () => {
            this.deleteHandler();
            keyElement.classList.add('pressed');
          });
          ['mouseup', 'mouseleave'].forEach((mouseEvent) => {
            keyElement.addEventListener(mouseEvent, () => {
              keyElement.classList.remove('pressed');
              this.textarea.focus();
            });
          });
          break;

        case 'Enter':
          keyElement.addEventListener('mousedown', () => {
            this.addTextToCursor('\n');
            keyElement.classList.add('pressed');
          });
          ['mouseup', 'mouseleave'].forEach((mouseEvent) => {
            keyElement.addEventListener(mouseEvent, () => {
              keyElement.classList.remove('pressed');
              this.textarea.focus();
            });
          });
          break;

        case 'Tab':
          keyElement.addEventListener('mousedown', () => {
            this.addTextToCursor('    ');
            keyElement.classList.add('pressed');
          });
          ['mouseup', 'mouseleave'].forEach((mouseEvent) => {
            keyElement.addEventListener(mouseEvent, () => {
              keyElement.classList.remove('pressed');
              this.textarea.focus();
            });
          });
          break;

        case 'ShiftLeft':
          keyElement.addEventListener('click', () => {
            keyElement.classList.toggle('pressed');
            if (keyElement.classList.contains('pressed')) {
              this.shiftIsPressed = true;
            } else {
              this.shiftIsPressed = false;
            }
            this.keyboardReInit(this.currentLanguage);
          });
          break;
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
            this.textarea.focus();
          });
          break;

        case 'CapsLock':
          keyElement.addEventListener('click', () => {
            this.capsLock = !this.capsLock;
            keyElement.classList.toggle('pressed');
            this.keyboardReInit(this.currentLanguage);
            this.textarea.focus();
          });
          break;

        case 'ControlLeft':
          keyElement.addEventListener('click', () => {
            this.controlIsPressed = !this.controlIsPressed;
            keyElement.classList.toggle('pressed');
          });
          break;
        case 'ControlRight':
          keyElement.addEventListener('mousedown', () => {
            keyElement.classList.add('pressed');
            if (this.altIsPressed) {
              this.changeLanguage();
              this.keyboardReInit(this.currentLanguage);
            }
          });
          ['mouseup', 'mouseleave'].forEach((mouseEvent) => {
            keyElement.addEventListener(mouseEvent, () => {
              keyElement.classList.remove('pressed');
            });
          });
          break;

        case 'AltRight':
        case 'AltLeft':
          keyElement.addEventListener('mousedown', () => {
            this.altIsPressed = true;
            keyElement.classList.add('pressed');
            if (this.controlIsPressed) {
              this.changeLanguage();
              this.keyboardReInit(this.currentLanguage);
            }
          });
          ['mouseup', 'mouseleave'].forEach((mouseEvent) => {
            keyElement.addEventListener(mouseEvent, () => {
              this.altIsPressed = false;
              keyElement.classList.remove('pressed');
            });
          });
          break;

        default:
          keyElement.addEventListener('mousedown', () => {
            let currentKeyValue = keyElement.querySelector('.currentKeyValue');
            currentKeyValue = currentKeyValue.textContent;
            keyElement.classList.add('pressed');
            this.addTextToCursor(currentKeyValue);
          });
          ['mouseup', 'mouseleave'].forEach((mouseEvent) => {
            keyElement.addEventListener(mouseEvent, () => {
              keyElement.classList.remove('pressed');
              this.textarea.focus();
            });
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
    // проверяем ОС клиента, чтобы правильно отрабатывать нажатия Capslock
    this.osIsMac = (navigator.userAgent.indexOf('Mac') !== -1);

    // и подключаем клавиши реальной клавиатуры
    this.keyboardHandler();
  }

  keyboardHandler() {
    // создаем листенер для нажатий на клавиши и обрабатываем разные события
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      // обаратываем клавиши, которых нет на экранной клавиатуре
      if (this.excludedFromScreenKeyboard.includes(event.code)) {
        return;
      }
      const activeKey = document.querySelector(`.${event.code}`);
      activeKey.classList.add('pressed');
      const calledKey = activeKey.querySelector('.currentKeyValue');
      const content = calledKey.textContent;
      switch (event.code) {
        case 'Backspace':
          this.backSpaceHandler();
          break;
        case 'Delete':
          this.deleteHandler();
          break;
        case 'Enter':
          event.preventDefault();
          this.addTextToCursor('\n');
          break;
        case 'Space':
          event.preventDefault();
          this.addTextToCursor(' ');
          break;
        case 'Tab':
          event.preventDefault();
          this.addTextToCursor('    ');
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.shiftIsPressed = true;
          this.keyboardReInit(this.currentLanguage);
          break;
        case 'CapsLock':
          if (this.osIsMac) {
            this.capsLock = true;
            this.keyboardReInit(this.currentLanguage);
          } else {
            this.capsLock = !this.capsLock;
            this.keyboardReInit(this.currentLanguage);
          }
          break;
        case 'ControlLeft':
          this.controlIsPressed = true;
          if (this.altIsPressed) {
            this.changeLanguage();
            this.keyboardReInit(this.currentLanguage);
          }
          break;
        case 'ControlRight':
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
          this.addTextToCursor(content);
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
          if (this.osIsMac) {
            this.capsLock = false;
            this.keyboardReInit(this.currentLanguage);
          }
          break;
        case 'ControlLeft':
          this.controlIsPressed = false;
          break;
        case 'ControlRight':
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
