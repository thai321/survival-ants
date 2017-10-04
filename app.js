// let particle;
var started = false;
let particles = [];
var food = [];
var poison = [];
var bg;
var pacman;
var foodIcon;
var poisonIcon;
var w = 1;
var h = 1;

var pressed = false;

var debug;

function preload() {
  bg = loadImage('images/picnic.jpg');
  ant = loadImage('images/ant.png');
  foodIcon = loadImage('images/food.ico');
  poisonIcon = loadImage('images/poison.png');
}

function setup() {
  createCanvas(w, h);

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

  for (let i = 0; i < 50; i++) {
    const x = random(40, width - 40);
    const y = random(40, height - 40);
    food.push(createVector(x, y));
  }

  for (let i = 0; i < 10; i++) {
    const x = random(40, width - 40);
    const y = random(40, height - 40);
    poison.push(createVector(x, y));
  }

  // debug = createCheckbox();
}

function debugChecked() {
  debug = !debug;
}

function mouseDragged() {
  food.push(createVector(mouseX, mouseY));
}

function mousePressed() {
  food.push(createVector(mouseX, mouseY));
}

function draw() {
  if (started) {
    background(bg);
    if (random(1) < 0.08) {
      const [x, y] = [random(40, width - 40), random(40, height - 40)];
      food.push(createVector(x, y));
    }

    if (random(1) < 0.01) {
      const [x, y] = [random(40, width - 40), random(40, height - 40)];
      poison.push(createVector(x, y));
    }

    for (let i = 0; i < food.length; i++) {
      image(foodIcon, food[i].x, food[i].y, 30, 30);
    }

    for (let i = 0; i < poison.length; i++) {
      image(poisonIcon, poison[i].x, poison[i].y, 30, 30);
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
  w = 620;
  h = 500;
  const welcome = document.getElementsByClassName('welcome')[0];
  // console.log(welcome);
  // welcome.remove();
  // debugger;

  welcome.classList.toggle('none');

  const btnReset = document.getElementsByClassName('btn-reset')[0];
  btnReset.classList.toggle('none');

  const debugButton = document.getElementsByClassName('debug')[0];
  debugButton.classList.toggle('none');
  // debugger;

  setup();
  loop();
}

function reset() {
  w = 1;
  h = 1;
  const welcome = document.getElementsByClassName('welcome')[0];
  welcome.classList.toggle('none');

  const btnReset = document.getElementsByClassName('btn-reset')[0];
  btnReset.classList.toggle('none');

  const debugButton = document.getElementsByClassName('debug')[0];
  debugButton.classList.toggle('none');

  setup();
}
