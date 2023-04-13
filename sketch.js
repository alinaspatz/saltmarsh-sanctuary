// class definitions
function LSystem(axiom, angle, lineLength, lengthMod, iterations) {
  this.axiom = axiom;
  this.angle = parseFloat(random(2, 20));
  this._lineLength = lineLength;
  this.lineLength = this._lineLength;
  this.lengthMod = lengthMod;
  this.iterations = iterations;
  this.rules = {};
  this.instructions = {};
  this.color = color(255, 243, 217);
  this.color = function (x, y, dir) {
    var c1 = color(40, 81, 90);
    var c2 = color(110, 174, 181);
    return lerpColor(c1, c2, y / height);
  };
  this.texture = createGraphics(window.innerWidth, window.innerHeight);
  this.addInstruction("F", function () {
    line(0, 0, 0, -this.lineLength);
    translate(0, -this.lineLength);
  });
  this.addInstruction("+", function () {
    rotate(-random(-40, 30));
  });
  this.addInstruction("-", function () {
    rotate(random(-40, 30));
  });
  this.addInstruction("[", function () {
    push();
  });
  this.addInstruction("]", function () {
    pop();
  });
  this.sentence = this.axiom;

  this.addInstruction("*", function () {
    // draw a flower
    noStroke();
    var r = int(random(170, 255));
    var g = int(random(100, 110));
    var b = int(random(230, 255));
    squareColor = color(r, g, b);
    squareColor.setAlpha(128 * random(0.5, 1));
    fill(color(squareColor));
    ellipse(0, 0, 2, 2);
    ellipse(2, 2, 2, 2);

    // fill(color("white"));
    // ellipse(0, -3, 6, 6);
    // fill(color("yellow"));
    // ellipse(0, -6, 3, 3);
  });
  this.addInstruction("Z", function () {
    if (random() < 0.00026) {
      strokeWeight(0.4);
      noStroke();
      // fill("rgba(255,255,255, 0.0)"); // set flower color
      fill("rgb(255,234,167)");
      // ellipse(0, 0, 7, 7); // draw flower
      //  for (let i = 0; i < 10; i ++) {
      // ellipse(0, 3, 2, 8);
      // rotate(PI/5);}
      // var val = cos(radians(angle)) * 9.0;
      // for (var a = 0; a < 360; a += 73) {
      // 	var xoff = cos(radians(a)) * val;
      // 	var yoff = sin(radians(a)) * val;
      // fill(treeHue+180);
      //       for(i = 0; i < 7; i++){
      // ellipse(0 + (xoff/1.7), 0 + (yoff/1.7), i*2.3);
      //    } }
      ellipse(0, 0, 1, 12);
      ellipse(0, 0, 13, 1);
      rotate(48);
      ellipse(0, 0, 12, 1);
      ellipse(0, 0, 1, 13);
      rotate(23);
      ellipse(0, 0, 1, 12);
      ellipse(0, 0, 13, 1);
      rotate(230);
      ellipse(0, 0, 12, 1);
      ellipse(0, 0, 1, 13);
      // stroke("rgba(228,123,142,.9)");
      stroke("rgb(254,214,0)");
      // stroke("black");

      noFill();
      ellipse(0, 0, 1, 12);
      ellipse(0, 0, 13, 1);
      rotate(48);
      ellipse(0, 0, 12, 1);
      ellipse(0, 0, 1, 13);
      rotate(23);
      ellipse(0, 0, 1, 12);
      ellipse(0, 0, 13, 1);
      rotate(230);
      ellipse(0, 0, 12, 1);
      ellipse(0, 0, 1, 13);

      fill("white");
      ellipse(0, 0, 3, 3);
    } else {
      // line(0, 0, 0, -this.lineLength);
      // translate(0, -this.lineLength);
    }
  });
}
LSystem.prototype = {
  addRule: function (input, output, chance) {
    if (!chance) {
      chance = 1.0;
    }
    // console.log('adding rule:', input, output, chance);
    this.rules[input] = {
      transform: output,
      chance: chance,
    };
  },
  addInstruction: function (char, callback, context) {
    if (!context) {
      context = this;
    }
    this.instructions[char] = callback.bind(context);
  },
  generate: function () {
    var s = "";
    var chars = this.getTokens();
    chars.forEach(function (c) {
      if (this.rules.hasOwnProperty(c)) {
        var rule = this.rules[c];
        var r = random();
        if (r <= rule.chance) {
          s += rule.transform;
        }
      } else {
        s += c;
      }
    }, this);
    this.sentence = s;
    this.lineLength *= this.lengthMod;
  },
  render: function () {},
  draw: function () {
    stroke(this.color);
    var chars = this.getTokens();
    chars.forEach(function (c) {
      if (this.instructions.hasOwnProperty(c)) {
        this.instructions[c]();
      }
    }, this);
  },
  getTokens: function () {
    return this.sentence.match(/./g);
  },
  run() {
    this.sentence = this.axiom;
    this.lineLength = this._lineLength;
    for (var i = 0; i < this.iterations; i++) {
      this.generate();
    }
  },
};

// global variables
var xyz;
var system, systems, gui, Specimen;

Specimen = 0;
selected = 0;
// initialize variables and display
function preload() {
  bg = loadImage("123.jpg");
}
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  angleMode(DEGREES);

  /**
   * Branching Systems
   **/
  systems = [];
  // A
  var a = new LSystem("F", xyz, 70, 0.4, 7);
  a.name = "Saltmarsh Loosestrife";
  // a.color = color(40, 130, 40);

  a.color = color(121, 230, 148);
  // a.color = color("black");
  // a.addRule('F', 'F[+F]F[-F]F');
  a.addRule("F", "F[+F]F[-F]F[Z]");

  // a.addRule('F', 'F[+F]F[-F]F[*]');

  // B
  var b = new LSystem("F", 20.0, 270, 0.41, 5);
  b.name = "Sea Blite";
  // b.color = color("black");

  b.color = color(230, 110, 135);
  b.addRule("F", "F[+F]F[-F][F]");

  //C
  //   var c = new LSystem('F', 22.5, 150, 0.41, 4);
  //       c.name = "Cpple";
  //   c.color = color("black");

  //   // c.color = color(230, 240, 240);
  //   c.addRule('F', 'FF-[-F+F+F]+[+F-F-F]');
  var c = new LSystem("F", 22.5, 360, 0.6, 6);
  c.name = "Saltmarsh Cordgrass";
  // c.color = color("black");

  c.color = color(210, 255, 130);
  c.addRule("F", "F[-X][+X]");
  c.addRule("X", "F[-X]F[+F]");

  //D
  var d = new LSystem("X", 20, 270, 0.45, 7);
  d.name = "Sea Lavender";
  // d.color = color("black");
  // d.color = color(40, 180, 40);

  d.color = color(180, 255, 180);
  // d.addRule('X', 'F[+X]F[-X]+X');

  d.addRule("X", "F[+X]F[-X]+X[*]");
  d.addRule("F", "FF");

  // E
  var e = new LSystem("X", 25.7, 295, 0.45, 7);
  e.name = "Tufted Hairgrass";
  // e.color = color("black");

  e.color = color(240, 255, 180);
  e.addRule("X", "F[+X][-X]FX");
  e.addRule("F", "FF");

  // F
  var f = new LSystem("X", 0.5, 110, 0.44, 6);
  f.name = "Seaside Knotweed";
  // f.color = color("black");
  f.color = color(131, 202, 138);

  // f.color = color(120, 200, 150);
  // f.addRule('X', 'F-[[X]+X]+F[+FX]-X');
  // f.addRule('F', 'FF');
  f.addRule("X", "F++F");
  f.addRule("F", "FXF[-F[-FX]+FX]");

  systems.push(a, b, c, d, e, f);
  system = systems[Specimen];
  // console.log('system rules:', system.rules);
  system.run();
  // console.log('system:', system);

  gui = new dat.GUI();
  // var c = gui.add(this, 'Specimen', [0, 1, 2, 3, 4, 5]);

  var c = gui.add(this, "Specimen", {
    "Saltmarsh Loosestrife": 0,
    "Sea Blite": 1,
    "Saltmarsh Cordgrass": 2,
    "Sea Lavender": 3,
    "Tufted Hairgrass": 4,
    "Seaside Knotweed": 5,
  });

  c.onFinishChange(loadPreset);
}

var clicks = 0;

function onClick() {
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;
}
function loadPreset(x) {
  // console.log('loading [Specimen]:', x);
  system = systems[x];
  system.run();
}

function mousePressed() {
  //system.generate();
}
// update function is used to update positions and dimensions of display objects
// this is also where collisions would be determined
function update() {}

// draw function is used to render display objects
function mousePressed() {
  if (mouseButton === LEFT) {
    xyz = random(2, 20);
    // call the update function
    update();
    strokeWeight(0.5);
    noFill();
    push();
    translate(mouseX, mouseY);
    system.draw();
    pop();
  } else {
  }
}

// function windowResized() {
//   resizeCanvas(window.innerWidth, window.innerHeight);
// }

// function changeText(text){
//   document.getElementById("scoreText").innerHTML = text;
// }
// var sel = document.querySelector('select option[value="0"]');
//     optAK = document.querySelector('option[value="0"]');

// // sel.prepend(optAK);
// sel.value = "0";
