<p align=center>
  <img src="readme-images/bepis-logo.jpg?raw=true" alt="Bepis Logo">
</p>

# [bepis](#dincc) ![download badge](https://img.shields.io/npm/dw/bepis) ![version badge](https://img.shields.io/npm/v/bepis/latest)

Bepis is a crazy new way to write static HTML + CSS in JavaScript.

[It Is On Npm](https://www.npmjs.com/package/bepis)

You can use [snowpack](https://github.com/pikapkg/snowpack).

## Examples

Just a simple example:

```html
<script type=module>
  import {w} from './web_modules/bepis.js';

  w`
    main,
      header,
        nav,
          h1 ${"Style"}...
      section ${{class:'content}},
        article dl,
          dt ${"A feature"}.
          dd ${"About this feature"}..
        article dl,
          dt ${"Another feature"}.
          dd ${"About this other feature"}..
      .
      footer nav ul,
        li a ${{href:'#about'}} #text ${"About"}.
        li a ${{href:'#legal'}} #text ${"Legal"}.
        li a ${{href:'#contact'}} #text ${"Contact"}.
        li a ${{href:'#faq'}} #text ${"FAQ"}.
        li a ${{href:'#support'}} #text ${"Support"}.
      .
  `(document.body);
</script>
```

Play with the following example [here](https://codesandbox.io/s/bepis-latest-playground-tucdl):

```javascript
import { w } from "bepis";

// for console play
window.w = w;

// do some bepis
w`
main, 
  style ${"nav.menubar {position: sticky; top: 0}"}. 
  nav ${{ innerText: "Good" }} ${{ background: "purple" }}. 
  header ${{ class: "banner" }}. 
  article ${{ class: "feature-box" }}, 
    ul, 
      li aside,
        h1 ${"A stunning feature"}. 
        h2 ${"Amazing byline of the feature"}..
  ..
  article ${{ class: "social-proof" }},
    ul,
      li aside,
        h1 ${"A fawning testimonial"}.
        h2 ${"Some Jerk paid to say nice things"}..
  ..
  article ${{ class: "cta plan-chooser" }},
    ul,
      li aside,
        h1 ${"Enterprise jerks"}.
        h2 ${"You'll pay us more than we need"}..
    .
    p ${"You only got one shot at this"} button ${"Purchase something now!"}.
  .
  footer ${{ class: "meaningless-legaleze" }},
    ul,
      li a ${{
        innerText: "Some link you'll never be able to contact us by",
        href: "#go-die"
      }}
  `(document.body);
```

## Get

```
$ npm i bepis
```

## TCM

*Traditional Chinese Medicine?* This time no. **#text, #map and #comp** directives.

- Use `#text` to insert text nodes that have siblings. Use `.innerText` in the first param to set text without siblings.

  ```javascript
    w`
      h1,
        #text ${"Bepis is "}.
        em ${"REALLY"}.
        #text ${" the best!"}.
        #text ${" YES"}
    `(document.body);
  ```
  
- Use `#comp` to insert another "Component": a function returning an Element or String.

  ```javascript
    const Spinner = () => w`i ${{class:'fa-spinner', hidden:true}}`;
    w`
    button,
      #text ${"Save"}.
      #comp ${data} ${Spinner}
    `
  ```
  - If first param is a function it is called to get the input to pass to second param.
  - Otherwise first param is passed to second param. The result inserted.
  - If second param is omitted, first param is a function. Its result inserted.
  
- Use `#map` to insert multiple.

  ```javascript
    const dataList = [{name:'He'}, {name:'Si'}, {name:'Kr'}];
    const ItemBepis = item => w`li h1 ${item.name}`;
    w`
    ul,
      #map ${dataList} ${ItemBepis}
    `
  ```
  - The second parameter can be omitted when each list member is an Element or a String.

## Basics

- Use template literals tagged with `w`. This creates a 'bepis'
- Use ',' operator to save an insertion point
- Use '.' operator to load an insertion point
- After a tag path the first parameter is the content (string or Element properties object)
- After a tag path the second parameter is the style (inline style object scoped to that element)
- A tagged template literal returns an insertion function. Call that function with the Element you want to append this markup to.
- Whitespace in the template literal has no special meaning and, except to separate tags, is ignored.
- If you want to use the style parameter, but not the content parameter you need to put a null or undefined in the content parameter. I do this in the examples by using a variable set to null.
- The last sequence of '.' operators in a bepis can **not** be omitted, otherwise those nodes will not be inserted.

## Related Projects

I don't know. I didn't search any "prior art." Let me know how I reinvented this beautiful wheel by opening a PR request.


----------


<p align=center>
  <img src="readme-images/bepiswatnsyou.jpg?raw=true" alt="Bepis Wants You" width="80%">
</p>
