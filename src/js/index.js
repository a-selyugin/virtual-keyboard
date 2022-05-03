import '../assets/styles/style.css';
import '../assets/styles/style.scss';
import keys from './keys';
import createKeyRow from './createKeyRow';
import appendElementTo from './appendElementTo';

// initialize page
// initialize page wrapper
appendElementTo('div', 'wrapper', '', document.body);
const wrapper = document.querySelector('.wrapper');

// create page content
appendElementTo('h1', 'header', 'Virtual Keyboard for RSSchool', wrapper);
appendElementTo('textarea', 'main__textarea', 'placeholder', wrapper);
appendElementTo('div', 'keyboard__container', '', wrapper);
appendElementTo('p', 'main__legend', 'placeholder1', wrapper);
appendElementTo('p', 'main__legend', 'placeholder2', wrapper);

// create keyboard rows
const keyboardContainer = document.querySelector('.keyboard__container');

for (let i = 0; i < 5; i += 1) {
  appendElementTo('div', `keyboard__row-${i + 1}`, '', keyboardContainer);
}

const keyboardRowOne = document.querySelector('.keyboard__row-1');
const keyboardRowTwo = document.querySelector('.keyboard__row-2');
const keyboardRowThree = document.querySelector('.keyboard__row-3');
const keyboardRowFour = document.querySelector('.keyboard__row-4');
const keyboardRowFive = document.querySelector('.keyboard__row-5');

// fill rows with keys
createKeyRow(keyboardRowOne, keys.firstRow);
createKeyRow(keyboardRowTwo, keys.secondRow);
createKeyRow(keyboardRowThree, keys.thirdRow);
createKeyRow(keyboardRowFour, keys.fourthRow);
createKeyRow(keyboardRowFive, keys.fifthRow);
