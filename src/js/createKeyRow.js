export default function createKeyRow(documentRow, ElementsRow) {
  for (let i = 0; i < ElementsRow.length; i += 1) {
    const keyElement = document.createElement('div');
    keyElement.classList.add('keyboard__key');
    keyElement.classList.add(ElementsRow[i].name);

    const engSpan = document.createElement('span');
    engSpan.classList.add('eng');

    const rusSpan = document.createElement('span');
    rusSpan.classList.add('rus');

    const engProps = Object.entries(ElementsRow[i].eng);
    const rusProps = Object.entries(ElementsRow[i].rus);

    for (let j = 0; j < engProps.length; j += 1) {
      const engSpanItem = document.createElement('span');
      const content = engProps[j][1];

      engSpanItem.classList.add(engProps[j][0]);

      if (engProps[j][0] !== 'lowerCase') {
        engSpanItem.classList.add('hidden');
      }

      engSpanItem.innerHTML = content;

      engSpan.append(engSpanItem);
    }

    for (let j = 0; j < rusProps.length; j += 1) {
      const rusSpanItem = document.createElement('span');
      const content = engProps[j][1];

      rusSpanItem.classList.add(engProps[j][0]);
      rusSpanItem.classList.add('hidden');

      if (content) {
        rusSpanItem.innerHTML = content;
      }

      rusSpan.append(rusSpanItem);
    }

    keyElement.append(engSpan);
    keyElement.append(rusSpan);
    documentRow.append(keyElement);

    keyElement.addEventListener('click', () => {
      console.log(ElementsRow[i].eng.lowerCase);
    });
  }
}
