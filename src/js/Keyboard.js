export default class Keyboard {
  constructor(container, keyboardArray, textarea) {
    this.keyboardArray = keyboardArray;
    this.container = container;
    this.textarea = textarea;
    this.capsLock = false;
    this.shiftIsPressed = false;
    this.outputString = '';

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
        lowerCaseSpan.classList.add('lowerCase');
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

        // создаем shiftedCaps Span
        const shiftedCaps = document.createElement('span');
        shiftedCaps.classList.add('lowerCase', 'hidden');
        shiftedCaps.innerHTML = content;
        newSpan.append(shiftedCaps);

        keyElement.append(newSpan);
      }

      documentRow.append(keyElement);

      // добавляем listener для каждого элемента
      keyElement.addEventListener('mousedown', () => {
        this.outputString += ElementsRow[i].engKey;
        this.textarea.value += ElementsRow[i].engKey;
        keyElement.classList.add('pressed');
      });
      keyElement.addEventListener('mouseup', () => {
        keyElement.classList.remove('pressed');
      });
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
  }
}
