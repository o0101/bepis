import {w, C} from './index.js';

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
      li ${"Option 1"}.
      li ${"Option 2"},
        p input ${{type:'submit'}}.
        p form button ${"SAVE"}.
      .
      li ${"Option 3"}.
    `(body);
  }

  {
    w`ul,
      li a ${{innerText: "Bugs", href: 'bugs.html'}}.
      li a ${{innerText: "Audits", href: 'audits.html'}}.
      li a ${{innerText: "PDFs", href: 'pdfs.html'}}.
      li a ${{innerText: "Isolation", href: 'isolation.html'}}.
      li a ${{innerText: "Tests", href: 'tests.html'}}.
    `(document.body);
  }

  {
    w`
      main, 
        nav ${{class:'menubar'}}.
        header ${{class:'banner'}}.
        article ${{class:'feature-box'}},
          ul,
            li aside,
              h1 ${"A stunning feature"}.
              h2 ${"Amazing byline of the feature"}.
            .
            li aside,
              h1 ${"A stunning feature"}.
              h2 ${"Amazing byline of the feature"}.
            .
            li aside,
              h1 ${"A stunning feature"}.
              h2 ${"Amazing byline of the feature"}.
            .
          .
        .
        article ${{class:'social-proof'}},
          ul,
            li aside,
              h1 ${"A fawning testimonial"}.
              h2 ${"Some Jerk paid to say nice things"}.
            .
            li aside,
              h1 ${"A fawning testimonial"}.
              h2 ${"Some Jerk paid to say nice things"}..
            li aside,
              h1 ${"A fawning testimonial"}.
              h2 ${"Some Jerk paid to say nice things"}..
          .
        .
        article ${{class:'cta plan-chooser'}},
          ul,
            li aside,
              h1 ${"Free tier"}.
              h2 ${"THis one is for penniless losers"}..
            li aside,
              h1 ${"Reccomended options"}
              h2 ${"You'll subsidize the free tier"}..
            li aside,
              h1 ${"Enterprise jerks"}.
              h2 ${"You'll pay us more than we need"}..
          .
          p ${"You only got one shot at this"} button ${"Purchase something now!"}.
        .
        footer ${{class:'meaningless-legaleze'}},
          ul,
            li a ${{innerText: "Some link you'll never be able to contact us by", href:"#go-die"}}.
            li a ${{innerText: "Some link you'll never be able to contact us by", href:"#go-die"}}.
            li a ${{innerText: "Some link you'll never be able to contact us by", href:"#go-die"}}.
            li a ${{innerText: "Some link you'll never be able to contact us by", href:"#go-die"}}.
            li a ${{innerText: "Some link you'll never be able to contact us by", href:"#go-die"}}.
            li a ${{innerText: "Some link you'll never be able to contact us by", href:"#go-die"}}.
          . 
        .
  `(document.body);

  }
}

