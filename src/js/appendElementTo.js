export default function appendElementTo(tag, className, htmlContent, targetElementName) {
  const newDiv = document.createElement(tag);
  newDiv.innerHTML = htmlContent;
  newDiv.classList.add(className);
  targetElementName.append(newDiv);
}
