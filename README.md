<p align=center>
  <img src="readme-images/bepis-logo.jpg?raw=true" alt="Bepis Logo">
</p>

# [bepis](#drincc) ![download badge](https://img.shields.io/npm/dw/bepis) ![version badge](https://img.shields.io/npm/v/bepis/latest)

Dynamic HTML + CSS in JavaScript.

[It Is On Npm](https://www.npmjs.com/package/bepis)

```shell
npm i bepis
```

## Examples

Simple keyed list, play with it [here](https://codesandbox.io/s/bepis-latest-playground-6cggy):

First, import:
```
import { w, clone } from "bepis";
```

Then set up some data:
```
const myItems = [
  { name: "Screw", description: "Part", key: "a3" },
  { name: "Moxie", description: "Intangible", key: "x5" },
  { name: "Sand", description: "Material", key: "p4" },
];
const newName = "Mojo";
```

Make some views:
```
const Item = item => w` ${item.key} 
  li p, 
    :text ${item.description}.
    a ${{ href: item.url }} :text ${item.name}..`;

const List = items => w` ${true} ul :map ${items} ${Item}`;
```

Render the data and mount the view to the document
```
List(myItems)(document.body);
```

Make a change and see it
```
const myChangedItems = clone(myItems);
myChangedItems[1].name = newName;

setTimeout(() => List(myChangedItems), 2000);
```

## :text, :map and :comp directives.

- Use `:text` to insert text, and `:map` to insert lists, as in the above example.
- Use `:comp` to insert components:
  ```javascript
    const Spinner = () => w`i ${{class:'fa-spinner', hidden:true}}`;
    w`
    button,
      :text ${"Save"}.
      :comp ${data} ${Spinner}..
    `
  ```

## Basics

- Use template literals tagged with `w`. This creates a 'bepis'
- Use ',' operator to save an insertion point
- Use '.' operator to load an insertion point
- `<tag name> ${attributes} ${styles}` is the format.
- `w` returns a mount function.
- If there's a parameter in w before any tags, it sets component type. Unique key gives a pinned component, true gives singleton. False, the default, gives a free component.
- Whitespace is ignored.

## Up next

- minimal diffing with updator functions.

## Related Projects

I don't know. I didn't search any "prior art." Let me know how I reinvented this beautiful wheel by opening a PR request.


----------


<p align=center>
  <img src="readme-images/bepiswatnsyou.jpg?raw=true" alt="Bepis Wants You" width="80%">
</p>
