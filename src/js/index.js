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

// fill keyboard
for (let i = 0; i < 5; i += 1) {
  appendElementTo('div', `keyboard__row-${i + 1}`, '', keyboardContainer);

  const keyboardRowArray = document.querySelector(`.keyboard__row-${i + 1}`);
  createKeyRow(keyboardRowArray, keys.keyboardArray[i]);
}

document.addEventListener('keydown', (event) => {
  console.log(event.code);
});
