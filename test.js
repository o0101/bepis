import {w, C} from './src/index.js';

{
  const o = null;
  const {body} = document;
  const myStyle = {
    color: '#808080',
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

  {
    w`form ${o} ${myStyle}, 
      p label ${"Name"} input ${{required: true, type:'text', placeholder:'your name'}}.
      p label ${"Email"} input ${{required: true, type:'email', placeholder:'your email'}}.
      p label ${"Password"} input ${{required: true, type:'password', placeholder:'your password'}}.
      p button ${"Sign up"} 
    `(body);
  }

  {
    w`ul, 
      li ${"Option 1"}, 
      li ${"Option 2"},
        p input ${{type:'submit'}}.
        p form button ${"SAVE"}.
      .
      li ${"Option 3"}.
    `(body);
  }
}

