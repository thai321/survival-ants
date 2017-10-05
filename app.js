// start the simulation
var started = false;

// list of ants, food, and poison
let ants = [];
var food = [];
var poison = [];

// background, food, poison images
var bg;
var foodIcon1, foodIcon2, foodIcon3;
var poisonIcon;

// width and height of canvas
var w = 1;
var h = 1;

// type of food
var type1, type2, type3;

// for debugging mode
var debug;

function preload() {
  bg = loadImage('images/picnic2.jpg');
  ant = loadImage('images/ant.png');
  foodIcon1 = loadImage('images/food.ico');
  foodIcon2 = loadImage('images/bugger.ico');
  foodIcon3 = loadImage('images/shake.png');
  poisonIcon = loadImage('images/poison2.png');

  $($('.buttons')[0]).hide();
  $($('.header2')[0]).hide();
}

function setup() {
  var canvas = createCanvas(w, h);
  canvas.parent('sketch-holder');
  resetSketch();

  noLoop();
}

function draw() {
  if (started) {
    background(bg);
    if (random(1) < 0.08) {
      const x = Math.random() * (width - 40) + 40;
      const y = Math.random() * (height - 40) + 40;

      food.push(createVector(x, y));
    }

    if (random(1) < 0.01) {
      const x = Math.random() * (width - 40) + 40;
      const y = Math.random() * (height - 40) + 40;

      poison.push(createVector(x, y));
    }

    let foodIcon = foodIcon1;
    if (type1) {
      foodIcon = foodIcon1;
    } else if (type2) {
      foodIcon = foodIcon2;
    } else if (type3) {
      foodIcon = foodIcon3;
    }

    for (let i = 0; i < food.length; i++) {
      image(foodIcon, food[i].x, food[i].y, 30, 30);
    }

    for (let i = 0; i < poison.length; i++) {
      image(poisonIcon, poison[i].x, poison[i].y, 40, 40);
    }

    for (let i = ants.length - 1; i >= 0; i--) {
      ants[i].inBound();
      ants[i].behaviors(food, poison);
      ants[i].update();
      ants[i].display();

      const newAnt = ants[i].copy();
      if (newAnt != null) {
        ants.push(newAnt);
      }

      if (ants[i].decay()) {
        const [x, y] = [ants[i].pos.x, ants[i].pos.y];
        food.push(createVector(x, y));

        ants.splice(i, 1);
      }
    }
  }
}

function start() {
  started = true;
  w = 820;
  h = 600;
  const welcome = document.getElementsByClassName('welcome')[0];
  welcome.classList.toggle('none');

  const btnReset = document.getElementsByClassName('btn-reset')[0];
  btnReset.classList.toggle('none');

  const debugButton = document.getElementsByClassName('debug')[0];
  debugButton.classList.toggle('none');

  $($('.buttons')[0]).show();
  $($('.header2')[0]).show();

  setup();
  loop();
}
