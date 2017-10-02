// let particle;
let particles = [];
var food = [];
var poison = [];

function setup() {
  createCanvas(640, 360);
  // particle = new Particle(width / 2, height / 2);

  for (let i = 0; i < 10; i++) {
    const x = random(width);
    const y = random(height);
    particles[i] = new Particle(x, y);
  }

  for (let i = 0; i < 10; i++) {
    const x = random(width);
    const y = random(height);
    food.push(createVector(x, y));
  }

  for (let i = 0; i < 10; i++) {
    const x = random(width);
    const y = random(height);
    poison.push(createVector(x, y));
  }
}

function draw() {
  background(51);

  // const mouse = createVector(mouseX, mouseY);
  // console.log(mouse);
  // fill(127);
  // stroke(200);
  // strokeWeight(2);
  // ellipse(mouse.x, mouse.y, 48, 48);
  // particle.seek(mouse);

  for (let i = 0; i < food.length; i++) {
    fill(0, 255, 0); // green
    noStroke();
    ellipse(food[i].x, food[i].y, 8, 8);
  }

  for (let i = 0; i < poison.length; i++) {
    fill(255, 0, 0); // red
    noStroke();
    ellipse(poison[i].x, poison[i].y, 8, 8);
  }

  // particle.get(food);
  // particle.get(poison);

  // particle.behaviors(food, poison);
  // particle.update();
  // particle.display();

  for (let i = 0; i < particles.length; i++) {
    particles[i].behaviors(food, poison);
    particles[i].update();
    particles[i].display();
  }
}
