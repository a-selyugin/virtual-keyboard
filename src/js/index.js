import '../assets/styles/style.css';
import '../assets/styles/style.scss';
import keys from './keys';
import appendElementTo from './appendElementTo';
import Keyboard from './Keyboard';

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

// create keyboard
const keyboard = new Keyboard(keyboardContainer, keys.keyboardArray);

keyboard.init();

document.addEventListener('keydown', (event) => {
  console.log(event.code);
});
