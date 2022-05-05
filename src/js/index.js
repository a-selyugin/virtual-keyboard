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
appendElementTo('textarea', 'main__textarea', '', wrapper);
appendElementTo('div', 'keyboard__container', '', wrapper);
appendElementTo('p', 'main__legend', 'placeholder1', wrapper);
appendElementTo('p', 'main__legend', 'placeholder2', wrapper);

// create keyboard rows
const keyboardContainer = document.querySelector('.keyboard__container');
const activeTextarea = document.querySelector('textarea');
// create keyboard
const keyboard = new Keyboard(keyboardContainer, keys.keyboardArray, activeTextarea);

keyboard.init();

document.addEventListener('keydown', (event) => {
  keyboard.outputString += event.code;
  activeTextarea.value += event.key;
  const activeKey = document.querySelector(`.${event.code}`);
  activeKey.classList.add('pressed');
});
document.addEventListener('keyup', (event) => {
  const activeKey = document.querySelector(`.${event.code}`);
  activeKey.classList.remove('pressed');
});
