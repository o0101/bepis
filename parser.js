export function parse(code, ...slots) {
  code = Array.from(code).join("$");

  let slice = {tags: '', params: [], children: []};
  const stack = [{children: [slice]}, slice];

  for( const char of code ) {
    switch(char) {
      case ' ':
      case '\t': 
      case '\n': 
      case '\r': {
        if ( slice.tags.slice(-1) != " " ) {
          slice.tags += ' ';
        }
      }; break;

      case '$': {
        slice.params.push(slots.shift());
      }; break;

      case ',': {
        const newSlice = {tags: '', params: [], children: []}; 
        slice.children.push(newSlice);
        slice = newSlice;
      }; break;

      case '.': {
        const newSlice = {tags: '', params: [], children: []}; 
        stack.pop();
        const oldSlice = stack.pop();
        stack.push(oldSlice);
        oldSlice.children.push(newSlice);
        stack.push(newSlice);
        slice = newSlice;
      }; break;

      default: {
        slice.tags += char;
      }; break;
    }
  }

  return point => console.log(point, {stack, slice});
}
