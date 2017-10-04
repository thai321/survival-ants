// let particle;
var started = false;
let particles = [];
var food = [];
var poison = [];
var bg;
var pacman;
var foodIcon1, foodIcon2, foodIcon3;
var poisonIcon;
var w = 1;
var h = 1;

var type1, type2, type3;

var pressed = false;

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

function resetSketch() {
  particles = [];
  food = [];
  poison = [];

  for (let i = 0; i < 15; i++) {
    const x = random(width);
    const y = random(height);
    particles[i] = new Particle(x, y);
  }

  for (let i = 0; i < 40; i++) {
    // const x = random(40, width - 40);
    // const x = random(40, width - 40);
    const x = Math.random() * (width - 40) + 40;
    const y = Math.random() * (height - 40) + 40;
    // const y = random(40, height - 40);

    console.log(x + ' : ' + y);
    food.push(createVector(x, y));
  }

  for (let i = 0; i < 10; i++) {
    const x = Math.random() * (width - 40) + 40;
    const y = Math.random() * (height - 40) + 40;
    poison.push(createVector(x, y));
  }

  // debug = createCheckbox();
}

function debugChecked() {
  debug = !debug;
}

function mouseDragged() {
  if (
    mouseX > 20 &&
    mouseX < width - 20 &&
    mouseY > 20 &&
    mouseY < height - 20
  ) {
    food.push(createVector(mouseX, mouseY));
  }
}

function mousePressed() {
  // food.push(createVector(mouseX, mouseY));
  if (
    mouseX > 20 &&
    mouseX < width - 20 &&
    mouseY > 20 &&
    mouseY < height - 20
  ) {
    food.push(createVector(mouseX, mouseY));
  }
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

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].inBound();
      particles[i].behaviors(food, poison);
      particles[i].update();
      particles[i].display();

      const newParticle = particles[i].copy();
      if (newParticle != null) {
        particles.push(newParticle);
      }

      if (particles[i].decay()) {
        const [x, y] = [particles[i].pos.x, particles[i].pos.y];
        food.push(createVector(x, y));

        particles.splice(i, 1);
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

function reset() {
  w = 1;
  h = 1;
  type1 = false;
  type2 = false;
  type3 = false;

  const welcome = document.getElementsByClassName('welcome')[0];
  welcome.classList.toggle('none');

  const btnReset = document.getElementsByClassName('btn-reset')[0];
  btnReset.classList.toggle('none');

  const debugButton = document.getElementsByClassName('debug')[0];
  debugButton.classList.toggle('none');

  $($('.buttons')[0]).hide();
  $($('.header2')[0]).hide();

  setup();
}

function food1() {
  type1 = true;
  type2 = false;
  type3 = false;
}
function food2() {
  type2 = true;
  type1 = false;
  type3 = false;
}
function food3() {
  type3 = true;
  type1 = false;
  type2 = false;
}
