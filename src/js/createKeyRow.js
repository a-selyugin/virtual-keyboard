export default function createKeyRow(documentRow, ElementsRow) {
  const exceptionsArray = ['Backspase', 'TAB', 'DEL', 'CAPS', 'Enter', 'Shift', 'Ctrl', 'Alt', 'Space', 'Up', 'Left', 'Down', 'Right'];

  for (let i = 0; i < ElementsRow.length; i += 1) {
    const keyElement = document.createElement('div');
    keyElement.classList.add('keyboard__key', ElementsRow[i].name);

    for (let j = 0; j < ElementsRow[i].languages.length; j += 1) {
      const language = ElementsRow[i].languages[j];
      let content;
      if (language === 'eng') {
        content = ElementsRow[i].engKey;
      }
      else if (language === 'rus') {
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

      // создаем upperCase Span
      const upperCaseSpan = document.createElement('span');
      upperCaseSpan.classList.add('upperCase', 'hidden');
      upperCaseSpan.innerHTML = content.includes(exceptionsArray) ? content : content.toUpperCase();

      // создаем caps Span
      const capsSpan = document.createElement('span');
      capsSpan.classList.add('caps', 'hidden');
      capsSpan.innerHTML = content.includes(exceptionsArray) ? content : content.toUpperCase();

      // создаем shiftedCaps Span
      const shiftedCaps = document.createElement('span');
      shiftedCaps.classList.add('lowerCase', 'hidden');
      shiftedCaps.innerHTML = content;

      newSpan.append(lowerCaseSpan);
      newSpan.append(upperCaseSpan);
      newSpan.append(capsSpan);
      newSpan.append(shiftedCaps);
      keyElement.append(newSpan);
    }

    documentRow.append(keyElement);

    keyElement.addEventListener('click', () => {
      console.log(ElementsRow[i].engKey);
    });
  }
}
