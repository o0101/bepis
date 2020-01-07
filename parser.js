const DEBUG = false;

export const C = w;
export function w(code, ...slots) {
  const root = buildTree(code, ...slots);
  const rootElement = treeToDOM(root);

  return point => {
    say("Insert at", point, rootElement);
    if ( point ) {
      point.insertAdjacentElement('beforeEnd', rootElement);
    }
    return rootElement;
  };
}

function buildTree(code, ...slots) {
  code = Array.from(code).join("$");

  say(code);

  let slice = {tag: '', params: [], children: []};
  const stack = [];

  for( const char of code ) {
    switch(char) {
      case ' ':
      case '\t': 
      case '\n': 
      case '\r': {
        if ( ! slice.finished && slice.tag.length ) {
          slice.finished = true;
          say("Got", slice.tag);
        }
      }; break;

      case '$': {
        slice.params.push(slots.shift());
      }; break;

      case ',': {
        slice.finished = true;
        stack.push(slice);
        say("Saved", slice.tag);
        const newSlice = {tag: '', params: [], children: []}; 
        slice.children.push(newSlice);
        slice = newSlice;
      }; break;

      case '.': {
        if ( slice.tag.length ) {
          slice.finished = true;
          // this can create an empty item that we remove after loop
          const newSlice = {tag: '', params: [], children: []}; 
          const oldSlice = stack.pop();
          oldSlice.children.push(newSlice);
          say("Reset to", oldSlice.tag);
          stack.push(oldSlice);
          slice = newSlice;
        } else {
          let oldSlice = stack.pop();
          const idx = oldSlice.children.indexOf(slice);
          oldSlice.children.splice(idx,1);
          oldSlice = stack.pop();
          oldSlice.children.push(slice);
          say("Reset to", oldSlice.tag);
          stack.push(oldSlice);
        }
      }; break;

      default: {
        if ( slice.finished ) {
          const newSlice = {tag: '', params: [], children: []}; 
          slice.children.push(newSlice);
          slice = newSlice;
        }
        slice.tag += char;
      }; break;
    }
  }


  // there could be an empty item
  if (! slice.tag.length ) {
    const parent = stack[0];  
    if ( parent ) {
      const idx = parent.children.indexOf(slice);
      parent.children.splice(idx,1);
    }
  }

  if ( stack.length ) {
    slice = stack.pop();
  }

  if ( stack.length ) {
    self.bepisParserError = {stack, slice};
    throw new TypeError("Missing . operators. See self.bepisParserError for final state");
  }

  return slice;
}

function treeToDOM(root) {
  const stack = [root];
  let parentElement;

  while( stack.length ) {
    const item = stack.pop();

    if ( item instanceof Element ) {
      if ( item.parentElement ) {
        parentElement = item.parentElement;
      } else break;
    } else if ( item.tag.length ) {
      const element = document.createElement(item.tag);
      say("Making", element);

      specify(element, ...item.params);

      if ( parentElement ) {
        parentElement.append(element);
      }
      parentElement = element;

      stack.push(element);
      if ( item.children.length ) {
        stack.push(...item.children.reverse());
      }
    } else {
      console.log("Empty item", item);
    }
  }
  say("Stack", stack, parentElement);
  return parentElement;
}

function specify(element, content, style) {
  // insert local content at stack top
    if ( content == null || content == undefined ) {
      // do nothing
    } else if ( typeof content == "string" ) {
      element.innerText = content;
    } else if ( typeof content == "object" ) {
      Object.keys(content).forEach(attrName => {
        const attrValue = content[attrName];
        try {
          element.setAttribute(attrName, attrValue);
        } catch(e) {}
        try {
          element[attrName] = attrValue;
        } catch(e) {}
      });
    }

  // apply style
    Object.assign(element.style, style);
}

function say(...args) {
  if ( DEBUG ) {
    console.log(...args);
  }
}
