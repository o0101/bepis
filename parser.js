const DEBUG = false;
const AsyncFunction = (async () => 1).__proto__.constructor;

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
  const stack = [slice];

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

      case '#': {
        if ( ! slice.finished && slice.tag.length ) {
          slice.finished = true;
          say("Got", slice.tag);
        }
        const newSlice = {tag: '', params: [], children: [], directive: true}; 
        slice.children.push(newSlice);
        slice = newSlice;
        slice.tag += char;
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

  while ( stack.length ) {
    slice = stack.pop();
  }


  return slice;
}

function treeToDOM(root) {
  say("Root", root);
  const stack = [root];
  let parentElement;

  while( stack.length ) {
    const item = stack.pop();

    if ( item instanceof Element ) {
      if ( item.parentElement ) {
        parentElement = item.parentElement;
      } else break;
    } else if ( item.tag.length ) {
      if ( item.directive ) {
        switch(item.tag) {
          case '#text': {
            if ( slice.params.length != 1 ) {
              console.warn({errorDetails:{slice});
              throw new TypeError(`Sorry, #text takes 1 parameter. ${slice.params.length} given.`);
            }
            const data = getData(slice.params[0]);
            if ( typeof data != "string" ) {
              console.warn({errorDetails:{slice});
              throw new TypeError(`Sorry, #text requires string data. ${data} given.`);
            }
          }; break;

          case '#map': {
            const [list, func] = slice.params;
            if ( ! parentElement ) {
              console.warn({errorDetails:{list,func}});
              throw new TypeError('#map can't be used top level, sorry. Wrap in Element');
            }
            if ( slice.params.length == 0 ) {
              console.warn({errorDetails:{list,func}});
              throw new TypeError('#map requires at least 1 argument');
            }
            if ( !!func && !(func instanceof Function) ) {
              console.warn({errorDetails:{list,func}});
              throw new TypeError('#map second parameter, if given, must be a function');
            } else if (func instanceof AsyncFunction ) {
              console.warn({errorDetails:{list,func}});
              throw new TypeError('Sorry, #map does not support AsyncFunctions. Maybe later.');
            }
            let data = getData(list);
            try {
              data = Array.from(data);
            } catch(e) {
              console.warn({errorDetails:{list,data,func}});
              throw new TypeError("Sorry, #map requires data that can be iterated.");
            }
            const resultItems = [];
            for ( const item of data ) {
              if ( !! func ) {
              const result = func(item);
              if ( result instanceof Element || typeof result == "string" ) {
                resultItems.push(result);
              } else {
                console.warn({errorDetails:{list,func}});
                throw new TypeError("#map must produce a list where each item is either an Element or a string");
              }
            }
            for ( const resultItem of resultItems ) {
              if ( resultItem instanceof Element ) {
                parentElement.append(resultItem);
              } else if ( typeof resultItem == "string" ) {
                parentElement.insertAdjacentText('beforeEnd', resultItem);
              }
            }
          }; break;

          case '#comp': {
            const [maybeDataOrFunc, func] = slice.params;
            if ( slice.params.length == 0 ) {
              console.warn({errorDetails:{maybeDataOrFunc,func}});
              throw new TypeError('#comp requires at least 1 argument');
            }
            if ( !!func && !(func instanceof Function) ) {
              console.warn({errorDetails:{maybeDataOrFunc,func}});
              throw new TypeError('#comp second parameter, if given, must be a function');
            } else if (func instanceof AsyncFunction ) {
              console.warn({errorDetails:{maybeDataOrFunc,func}});
              throw new TypeError('Sorry, #comp does not support AsyncFunctions. Maybe later.');
            }
            if ( !func ) {
              func = x => x;
            }
            let data = getData(maybeDataOrFunc);
            const result = func(data);
            if ( result instanceof Element ) {
              if ( parentElement ) {
                parentElement.append(result);
              }
              parentElement = result;
              stack.push(result);
            } else if ( typeof result == "string" ) {
              if ( parentElement ) {
                parentElement.insertAdjacentText('beforeEnd', result);
              } else {
                console.warn({errorDetails:{maybeDataOrFunc,func, result}});
                throw new TypeError('Sorry, #comp cannot insert text at the top level.');
              }
            } else {
              console.warn({errorDetails:{maybeDataOrFunc,func, result}});
              throw new TypeError(`Sorry, #comp can only insert an Element or a string. ${result} given.`);
            }
          }; break;

          default: {
            console.warn({errorDetails:{item});
            throw new TypeError(`${item.tag} is an unknown directive.`);
          }
        }
        if ( item.children.length ) {
          console.warn({errorDetails:{item});
          throw new TypeError("Sorry, this directive cannot have children");
        }
      } else {
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
      }
    } else {
      say("Empty item", item);
    }
  }

  while( parentElement.parentElement ) {
    parentElement = parentElement.parentElement;
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

function getData(maybeFunc) {
  if ( maybeFunc instanceof Function ) {
    if ( maybeFunc instanceof AsyncFunction ) {
      console.warn({errorDetails:{maybeFunc}});
      throw new TypeError("Sorry, AsyncFunctions as data producing functions are not supported. Maybe in future.");
    }
    maybeFunc = maybeFunc();
  } else {
    return maybeFunc;
  }
}

function say(...args) {
  if ( DEBUG ) {
    console.log(...args);
  }
}
