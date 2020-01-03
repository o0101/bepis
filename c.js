// what i want

const o = null;
const {body} = document;
const myText = 'Cris Stringfellow is Fucking Awesome';
const myStyle = {
  color: '#b0b0b0',
  background: 'linear-gradient(to right, lime, dodgerblue)',
  margin: 0
};
C`h1 ${myText} ${myStyle}`(body);
const list = C`ul ${o} ${myStyle}`(body);
C`li ${myText} ${myStyle}`(list);
C`li ${myText} ${myStyle}`(list);
C`li ${myText} ${myStyle}`(list);


function C([tag], text, style) {
  tag = tag.trim();
  z = document.createElement(tag);
  z.innerText = text;
  Object.assign(z.style, style);
  return point => {
    point.insertAdjacentElement('beforeEnd', z);
    return z;
  };
}
