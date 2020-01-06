import {parse} from './parser.js';

const DEBUG = false;
C.maxLength = 3;
const LOAD_OPERATOR = '.';
const SAVE_OPERATOR = ',';
const PARAM_OPERATOR = '$';
const OPERATOR = /\.|,|$/g;

export const w = parse;

export function C([tag], content = '', style = {}) {
  DEBUG && console.log({tag, content, style});
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

  while(z.parentElement) {
    z = z.parentElement; 
  }

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

export function w_old(tags, ...params) {
  const tagStack = [];
  tags = Array.from(tags);
  tags = tags.join('$_');
  tags = tags.split('_');
  let m, M;
  while( hasSlice(tags) ) {
    let [tag, content, style] = nextSlice(tags, params, tagStack);
    let saves = tag.includes(SAVE_OPERATOR);
    let loads = tag.includes(LOAD_OPERATOR);
    if ( saves && loads ) {
      throw new TypeError("Such tag sequences containing save and load operators are not implemented yet.");
    } else if ( loads && tag.startsWith(LOAD_OPERATOR) ) {
      tag = tag.slice(1);
      ({savePoint:M} = tagStack.pop());
      if ( tag.length ) {
        tagStack.push({savePoint:M});
      }
    } else if ( saves && tag.startsWith(SAVE_OPERATOR) ) {
      tag = tag.slice(1);
      tagStack.push({savePoint: M});
    } else if ( saves || loads ) {
      throw new TypeError("Using saves or loads in this configuration is not supported yet", tag);
    }

    tag = tag.trim(); 

    console.log(M, tag, content, style);
    if ( tag.length ) {
      if ( ! m ) {
        const nextM = C.call("free", [tag], content, style);
        m = nextM;
        M = nextM();
      } else {
        const nextM = C([tag], content, style);
        M = nextM(M);
      }
    }
  }
  return m || (() => 0);
}

function hasSlice(tags = []) {
  return tags.length && tags.some(t => t.trim().length);
}

function nextSlice(tags = [], params = [], tagStack) {
  let tag = tags.shift();
  let param = [];
  const slice = {};
  operators: while( tag.search(OPERATOR) > -1 ) {
    const idx = tag.search(OPERATOR)
    const type = tag[idx];
    const [head, tail] = [tag.slice(0, idx).trim(), tag.slice(idx+1).trim()];
    console.log(head, type, tail);
    alert(1);
    switch(type) {
      case LOAD_OPERATOR:
      case SAVE_OPERATOR: {
        if ( head.length ) {
          slice.tag = head;
          tags.unshift(type + tail);
        } else {
          slice.tag = type;
          tags.unshift(tail);
        }
      }
      break operators;
      case PARAM_OPERATOR: {
        if ( head.length ) {
          tag = head;
          param.push(params.shift());
        } else {
          throw new TypeError("This can't happen");
        }
        console.log(tag, param);
      }
      break operators;
    }
  }
  console.log("OK");
  while (tags.length && tags[0].trim() == PARAM_OPERATOR) {
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
