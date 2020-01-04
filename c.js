// what i want

const o = null;
const {body} = document;
const myStyle = {
  color: '#b0b0b0',
  background: 'linear-gradient(to right, lime, dodgerblue)',
  margin: 0
};

{
  const f = C`form ${o} ${myStyle}`(body);
  const l = C`p label ${"Name"}`(f);
  C`input ${{
    type: 'text',
    placeholder: 'your name'
  }}`(l);
}

{
  C`input ${{
    type: 'text',
    placeholder: 'your name'
  }}`(C`p label ${"Name"}`(C`form ${o} ${myStyle}`(body)));
}

{
  w`form ${o} ${myStyle} p label ${"Name"} input ${{type:'text', placeholder:'your name'}}`(body);
}


function C([tag], content = '', style = {}) {
  if ( ! tag ) {
    throw new TypeError("Must specify tag");
  }

  // make tag stack
    tag = tag.trim().split(/\s+/g).filter(t  => t.length);
    let z = document.createElement(tag.shift());
    for ( const t of tag ) {
      z = z.appendChild(document.createElement(t));
    }


  // insert local content at stack top
    if ( content == null || content == undefined ) {
      // do nothing
    } else if ( typeof content == "string" ) {
      z.innerText = content;
    } else if ( typeof content == "object" ) {
      Object.keys(content).forEach(attrName => {
        const attrValue = content[attrName];
        try {
          z.setAttribute(attrName, attrValue);
        } catch(e) {}
        try {
          z[attrName] = attrValue;
        } catch(e) {}
      });
    }

  // apply style
    Object.assign(z.style, style);

  // return inserter function
    return point => {
      if ( ! point ) {
        throw new TypeError("Must provide an insertion point to the function call.");
      }
      point.insertAdjacentElement('beforeEnd', z);
      return z;
    };
}

function w(tags, params) {
  let m, M;
  while( hasSlice(tags, params) ) {
    ([tag, content, style] = nextSlice(tags, params));
    const nextM = C([tag], content, style);
    M = nextM(M);
    if ( ! m ) {
      m = M;
    }
  }
  return m;
}

function hasSlice(tags, params) {

}

function nextSlice(tags, params) {

}
