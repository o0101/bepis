import {w,clone} from './index.js';

{
  const o = undefined;
  const {body} = document;
  const myStyle = {
    color: '#808080',
    background: 'linear-gradient(to right, lime, dodgerblue)',
    margin: 0
  };

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

  // :text test
  {
    w`
      h1,
        :text ${"Bepis is "}.
        em ${"REALLY"}.
        :text ${" the best!"}.
        :text ${" YES"}
    `(document.body);
  }

  // :comp test
  {
    const data = [
      {name:"Name", spec: {required: true, type:'text', placeholder:'your name'}},
      {name:"Email", spec: {required: true, type:'text', placeholder:'your email'}},
      {name:"Password", spec: {required: true, type:'text', placeholder:'your password'}},
    ];
    const field = ({name, spec}) => w`p label ${name} input ${spec}`;

    const form = ({x,y} = {}) => w`form ${o} ${myStyle}, 
        :map ${data} ${field}.
        p button ${x || y ? `Sign Up ${x+y}`: "Sign Up"} 
      `();

    w`
      article,
        h1 ${"Godot Waited!!"}.
        section ${{class:'form'}},
          p ${"Fill it out"}.
          :comp ${o} ${form}.
          p ${"End of section"}
    `(document.body);

    w`
      article,
        h1 ${"Godot Waited with data function"}.
        section ${{class:'form'}},
          p ${"Fill it out"}.
          :comp ${() => ({x:1,y:2})} ${form}.
          p ${"End of section"}
    `(document.body);

    w`
      article,
        h1 ${"Godot Waited with 1 param comp on form"}.
        section ${{class:'form'}},
          p ${"Fill it out"}.
          :comp ${form}.
          p ${"End of section"}
    `(document.body);
  }

  // :map test
  {
    const data = [
      {name:"Name", spec: {required: true, type:'text', placeholder:'your name'}},
      {name:"Email", spec: {required: true, type:'text', placeholder:'your email'}},
      {name:"Password", spec: {required: true, type:'text', placeholder:'your password'}},
    ];
    const field = ({name, spec}) => w`p label ${name} input ${spec}`;

    w`form ${o} ${myStyle}, 
      :map ${data} ${field}.
      p button ${"Sign up"} 
    `(body);

    w`form ${"Excellent Form with Data Function"} ${myStyle}, 
      :map ${() => data} ${field}.
      p button ${"Sign up"} 
    `(body);
  }

  const intervals = [];
  // pin <key> test (instance)
  // passes
  {
    // should print 2 widgets that are 'pinned' to their mount locations

    let count = 0;
    let print = key => w`
      ${key}
      p label ${"Great " + key + " " + count++} input ${{value:"hat " + count}}`;
      
    // mount
    print('abc123')(document.body);
    print('abc124')(document.body);

    intervals.push(setInterval(() => print('abc123'), 1000));
    intervals.push(setInterval(() => print('abc124'), 500));
  }

  // pin true test (singleton)
  // passes
  {
    // should print only 1 widget updating every 500ms

    let count = 0;
    let print = key => w`
      ${true}
      p label ${"Great " + count++} input ${{value:"hat " + count}}`;

    //mount
    print()(document.body);

    intervals.push(setInterval(() => print('abc123'), 1000));
    intervals.push(setInterval(() => print('abc124'), 500));
  }

  // pin false test (free)
  // passes
  {
    // should print a new widget every 500ms

    let count = 0;
    let print = key => w`
      ${false}
      p label ${"Great " + count++} input ${{value:"hat " + count}}`;

    intervals.push(setInterval(() => print('abc123')(document.body), 1000));
    intervals.push(setInterval(() => print('abc124')(document.body), 500));
  }

  // pin <key> no duplication on re-mount test
  // passes
  {
    // should print only 2 widgets even tho re-mounted each call

    let count = 0;
    let print = key => w`
      ${key}
      p label ${"Great " + key + " " + count++} input ${{value:"hat " + count}}`;
      
    // mount
    print('abc123')(document.body);
    print('abc124')(document.body);

    intervals.push(setInterval(() => print('abc123')(document.body), 1000));
    intervals.push(setInterval(() => print('abc124')(document.body), 500));
  }

  setTimeout(() => {
    console.log("Clearing intervals " + intervals.join(','));
    intervals.forEach(i => clearInterval(i)); 
  }, 5000);
  
  {
		// setup
		const Item = item => w`${item.key}
			li p, 
        :text ${item.description}.
        a ${{ href: item.url }} :text ${item.name}.
      .`;
		const List = items => w`${true} ul :map ${items} ${Item}`;
		const myItems = [
			{ name: "Ratchet", description: "Tool", key: "z2" },
			{ name: "Screw", description: "Part", key: "a3" },
			{ name: "Sand", description: "Material", key: "p4" },
			{ name: "Moxie", description: "Intangible", key: "x5" },
			{ name: "Delilah", description: "Name", key: "s1" }
		];
		const newName = "Mojo";

		Object.assign(window, { Item, List, myItems, newName });

		// use
		List(myItems)(document.body); // mount it
    const myChangedItems = clone(myItems);
		myChangedItems[3].name = newName; // change something
    console.clear();
    setTimeout(() => List(myChangedItems), 1000) // only item 3 will change
  }

  // function in style slot test
  {
    const print = value => w`p label ${"Label"} input ${{value}} ${styler}`;
      
    print('abc124')(document.body);

    function styler() {
      return {
        background: 'dodgerblue',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '21pt'
      };
    }
  }

  // string (stylist function name for style.dss) in style slot test
  {
    const print = value => w`p label ${"Label"} input ${{value}} ${"styler"}`;
      
    print('abc124')(document.body);

    function styler() {
      return `
        * {
          background: 'dodgerblue';
          color: 'white';
          font-weight: 'bold';
        }
      `;
    }
  }
}

