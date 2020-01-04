C.maxLength = 3;

export function C([tag], content = '', style = {}) {
  console.log(tag, content, style);
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
      if ( ! point && this != 'free' ) {
        throw new TypeError("Must provide an insertion point to the function call.");
      }
      if ( !! point ) {
        point.insertAdjacentElement('beforeEnd', z);
      }
      return z;
    };
}

export function w(tags, ...params) {
  tags = Array.from(tags);
  let m, M;
  while( hasSlice(tags) ) {
    let [tag, content, style] = nextSlice(tags, params);
    if ( ! m ) {
      const nextM = C.call("free", [tag], content, style);
      m = nextM;
      M = nextM();
    } else {
      const nextM = C([tag], content, style);
      M = nextM(M);
    }
  }
  return m || (() => 0);
}

function hasSlice(tags = []) {
  return tags.length && tags.some(t => t.trim().length);
}

function nextSlice(tags = [], params = []) {
  let tag = tags.shift();
  let param = [params.shift()];
  while (tags.length && tags[0].trim().length == 0) {
    tags.shift();
    param.push(params.shift());
  }
  if ( ! tag ) {
    throw new TypeError("No tags remaining. Call hasSlice first.");
  }
  if ( param.length > C.maxLength - 1) {
    console.warn(tag, param);
    throw new TypeError(`A tag can only accept ${C.maxLength - 1} params. Got ${param.length}`);
  }

  return [tag, ...param];
}
