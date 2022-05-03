import "./assets/styles/style.css";
import "./assets/styles/style.scss";

// initialize page

function addElement(tag, className, htmlContent, elementName){
    let newDiv = document.createElement(tag);
    newDiv.innerHTML = htmlContent;
    newDiv.classList.add( className );
    elementName.append(newDiv);
}

addElement('div','wrapper','', document.body);

let wrapper = document.querySelector('.wrapper');

addElement('h1','header','Virtual Keyboard for RSSchool', wrapper);
addElement('textarea', 'main__textarea', 'placeholder', wrapper);
addElement('div','keyboard__container','', wrapper);
addElement('p','main__legend','placeholder1',wrapper);
addElement('p','main__legend','placeholder2',wrapper);


