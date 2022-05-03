import './assets/styles/style.css';
import './assets/styles/style.scss';
import keys from './keys';
import createKeyRow from './createKeyRow';

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

createKeyRow(keyboardRowOne, keys.firstRow);
createKeyRow(keyboardRowTwo, keys.secondRow);
createKeyRow(keyboardRowThree, keys.thirdRow);
createKeyRow(keyboardRowFour, keys.fourthRow);
createKeyRow(keyboardRowFive, keys.fifthRow);
