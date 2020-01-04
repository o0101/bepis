import {w, C} from './index.js';

{
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
}

