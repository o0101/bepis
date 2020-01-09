import {w} from './index.js';

{
  const o = undefined;
  const {body} = document;
  const myStyle = {
    color: '#808080',
    background: 'linear-gradient(to right, lime, dodgerblue)',
    margin: 0
  };

  /**
  {
    w`form ${o} ${myStyle}, 
      p label ${"Name"} input ${{required: true, type:'text', placeholder:'your name'}}.
      p label ${"Email"} input ${{required: true, type:'email', placeholder:'your email'}}.
      p label ${"Password"} input ${{required: true, type:'password', placeholder:'your password'}}.
      p button ${"Sign up"} 
    `(body);
  }

  {
    w`
      main, 
        style ${'nav.menubar { position: sticky; top: 0 }'}.
        nav ${{innerText:'Good', class:'menubar'}} ${{background: 'purple'}}.
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
  **/

  // #text test
  {
    w`
      h1,
        #text ${"Bepis is "}.
        em ${"REALLY"}.
        #text ${" the best!"}.
        #text ${" YES"}
    `(document.body);
  }
  // #comp test
  {
    const data = [
      {name:"Name", spec: {required: true, type:'text', placeholder:'your name'}},
      {name:"Email", spec: {required: true, type:'text', placeholder:'your email'}},
      {name:"Password", spec: {required: true, type:'text', placeholder:'your password'}},
    ];
    const field = ({name, spec}) => w`p label ${name} input ${spec}`();

    const form = ({x,y} = {}) => w`form ${o} ${myStyle}, 
        #map ${data} ${field}.
        p button ${x || y ? `Sign Up ${x+y}`: "Sign Up"} 
      `();

    w`
      article,
        h1 ${"Godot Waited"}.
        section ${{class:'form'}},
          p ${"Fill it out"}.
          #comp ${o} ${form}.
          p ${"End of section"}
    `(document.body);

    w`
      article,
        h1 ${"Godot Waited with data function"}.
        section ${{class:'form'}},
          p ${"Fill it out"}.
          #comp ${() => ({x:1,y:2})} ${form}.
          p ${"End of section"}
    `(document.body);

    w`
      article,
        h1 ${"Godot Waited with 1 param comp on form"}.
        section ${{class:'form'}},
          p ${"Fill it out"}.
          #comp ${form}.
          p ${"End of section"}
    `(document.body);
  }

  // #map test
  {
    const data = [
      {name:"Name", spec: {required: true, type:'text', placeholder:'your name'}},
      {name:"Email", spec: {required: true, type:'text', placeholder:'your email'}},
      {name:"Password", spec: {required: true, type:'text', placeholder:'your password'}},
    ];
    const field = ({name, spec}) => w`p label ${name} input ${spec}`();

    w`form ${o} ${myStyle}, 
      #map ${data} ${field}.
      p button ${"Sign up"} 
    `(body);

    w`form ${"Excellent Form with Data Function"} ${myStyle}, 
      #map ${() => data} ${field}.
      p button ${"Sign up"} 
    `(body);
  }
}

