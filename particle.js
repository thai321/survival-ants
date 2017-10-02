function Particle(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, -2);
  this.pos = createVector(x, y);
  this.r = 3;
  this.maxspeed = 4;
  this.maxforce = 0.01;

  this.dna = [];
  this.dna[0] = random(-5, 5);
  this.dna[1] = random(-5, 5);

  // update location
  this.update = function() {
    // update velocity
    this.velocity.add(this.acceleration);

    //limit speed
    this.velocity.limit(this.maxspeed);
    this.pos.add(this.velocity);

    // Reset accelerationeleration to 0 each cycle
    this.acceleration.mult(0);
  };

  this.applyForce = function(force) {
    this.acceleration.add(force);
  };

  this.behaviors = function(food, poison) {
    let foodSteering = this.get(food);
    let poisonSteering = this.get(poison);

    foodSteering.mult(this.dna[0]);
    poisonSteering.mult(this.dna[1]);

    this.applyForce(foodSteering);
    this.applyForce(poisonSteering);
  };

  this.get = function(list) {
    let record = Infinity;
    let closestIndex = -1;

    for (let i = 0; i < list.length; i++) {
      // const d = dist(this.pos.x, this.pos.y, list[i].x, list[i].y);
      const d = this.pos.dist(list[i]);
      if (d < record) {
        record = d;
        closestIndex = i;
      }
    }

    if (record < 5) {
      // get rid of the food
      // 5 pixels
      list.splice(closestIndex, 1);
    } else if (closestIndex > -1) {
      return this.seek(list[closestIndex]);
    }

    return createVector(0, 0);
  };

  this.seek = function(target) {
    // desire veloctiy = target location - the particle location
    const desired = p5.Vector.sub(target, this.pos);

    // scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired - velocity
    const steer = p5.Vector.sub(desired, this.velocity);
    // streering = desire velocity - current velocity
    steer.limit(this.maxforce); // limit to maximum steering force

    // this.applyForce(steer);
    return steer;
  };

  this.display = function() {
    // Draw a triangle rotated in the direction
    const theta = this.velocity.heading() + PI / 2;

    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);

    stroke(0, 255, 0);
    line(0, 0, 0, -this.dna[0] * 10);

    stroke(255, 0, 0);
    line(0, 0, 0, -this.dna[1] * 10);

    fill(127);
    stroke(200);
    strokeWeight(1);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);

    endShape(CLOSE);

    pop();
  };
}
