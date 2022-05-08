import '../assets/styles/style.css';
import '../assets/styles/style.scss';
import keys from './keyboard-arrays';
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
appendElementTo('p', 'main__legend', 'Для смены языка используйте Left Ctrl + Alt.', wrapper);
appendElementTo('p', 'main__legend', 'Для того, чтобы можно было сменить язык с экранной клавиатуры, клавиша Ctrl сделана зажимаемой.', wrapper);
appendElementTo('p', 'main__legend', 'Клавиатура была разработана в операционной системе OSX.', wrapper);

// create keyboard rows
const keyboardContainer = document.querySelector('.keyboard__container');
const activeTextarea = document.querySelector('textarea');
// create keyboard
const keyboard = new Keyboard(keyboardContainer, keys.keyboardArray, activeTextarea);

keyboard.init();
// блокируем textarea для изменений кроме экранной клавиатуры
