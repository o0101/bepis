export function parse(code, ...slots) {
  code = Array.from(code).join("$");

  console.log(code);

  let slice = {tags: '', params: [], children: []};
  const stack = [];

  for( const char of code ) {
    switch(char) {
      case ' ':
      case '\t': 
      case '\n': 
      case '\r': {
        if ( ! slice.finished && slice.tags.length ) {
          slice.finished = true;
          console.log("Got", slice.tags);
        }
      }; break;

      case '$': {
        slice.params.push(slots.shift());
      }; break;

      case ',': {
        slice.finished = true;
        stack.push(slice);
        console.log("Saved", slice.tags);
        const newSlice = {tags: '', params: [], children: []}; 
        slice.children.push(newSlice);
        slice = newSlice;
      }; break;

      case '.': {
        if ( slice.tags.length ) {
          slice.finished = true;
          const newSlice = {tags: '', params: [], children: []}; 
          const oldSlice = stack.pop();
          oldSlice.children.push(newSlice);
          console.log("Reset to", oldSlice.tags);
          stack.push(oldSlice);
          slice = newSlice;
        } else {
          let oldSlice = stack.pop();
          const idx = oldSlice.children.indexOf(slice);
          oldSlice.children.splice(idx,1);
          oldSlice = stack.pop();
          oldSlice.children.push(slice);
          console.log("Reset to", oldSlice.tags);
          stack.push(oldSlice);
        }
      }; break;

      default: {
        if ( slice.finished ) {
          const newSlice = {tags: '', params: [], children: []}; 
          slice.children.push(newSlice);
          slice = newSlice;
        }
        slice.tags += char;
      }; break;
    }
  }

  slice = stack.pop();

  return point => console.log(point, {stack, slice});
}
