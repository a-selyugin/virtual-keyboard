import './assets/styles/style.css';
import './assets/styles/style.scss';
import keys from './keys';

// initialize page d

function addElement(tag, className, htmlContent, elementName) {
  const newDiv = document.createElement(tag);
  newDiv.innerHTML = htmlContent;
  newDiv.classList.add(className);
  elementName.append(newDiv);
}

addElement('div', 'wrapper', '', document.body);

const wrapper = document.querySelector('.wrapper');

addElement('h1', 'header', 'Virtual Keyboard for RSSchool', wrapper);
addElement('textarea', 'main__textarea', 'placeholder', wrapper);
addElement('div', 'keyboard__container', '', wrapper);
addElement('p', 'main__legend', 'placeholder1', wrapper);
addElement('p', 'main__legend', 'placeholder2', wrapper);

const keyboardContainer = document.querySelector('.keyboard__container');

addElement('div', 'keyboard__row-1', '', keyboardContainer);
addElement('div', 'keyboard__row-2', '', keyboardContainer);
addElement('div', 'keyboard__row-3', '', keyboardContainer);
addElement('div', 'keyboard__row-4', '', keyboardContainer);
addElement('div', 'keyboard__row-5', '', keyboardContainer);

const keyboardRowOne = document.querySelector('.keyboard__row-1');
const keyboardRowTwo = document.querySelector('.keyboard__row-2');
const keyboardRowThree = document.querySelector('.keyboard__row-3');
const keyboardRowFour = document.querySelector('.keyboard__row-4');
const keyboardRowFive = document.querySelector('.keyboard__row-5');

// for (let i = 0; i < keys.firstRow.length; i += 1) {
//   addElement('div', keys.firstRow[i].name, keys.firstRow[i].eng.lowerCase, keyboardRowOne);
// }

function createKeyRow(documentRow, ElementsRow) {
  for (let i = 0; i < ElementsRow.length; i += 1) {
    const keyElement = document.createElement('div');
    keyElement.classList.add('keyboard__key');

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
      const content = engProps[j][2];

      rusSpanItem.classList.add(engProps[j][1]);
      rusSpanItem.classList.add('hidden');

      rusSpanItem.innerHTML = content;

      rusSpan.append(rusSpanItem);
    }

    keyElement.append(engSpan);
    keyElement.append(rusSpan);
    documentRow.append(keyElement);
  }
}

createKeyRow(keyboardRowOne, keys.firstRow);

//console.log(keys.firstRow, keys.secondRow, keys.thirdRow, keys.fourthRow, keys.fifthRow);
