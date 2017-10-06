function Ant(x, y, dna) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, -2);
  this.pos = createVector(x, y);
  this.r = 4;
  this.maxspeed = 3;
  this.maxforce = 0.2;
  this.health = 1;

  this.dna = [];
  if (dna === undefined) {
    // Food attraction
    this.dna[0] = random(4, 10);

    // Poison attraction
    // this.dna[1] = random(-5, 5);

    // food eye
    this.dna[2] = random(40, 100);

    // poison eye
    // this.dna[3] = random(5, 100);
  } else {
    this.dna[0] = dna[0];
    if (random(1) < 0.01) {
      this.dna[0] += random(0, 0.2);
    }

    // this.dna[1] = dna[1];
    // if (random(1) < 0.01) {
    //   this.dna[1] += random(-0.1, 0.1);
    // }

    this.dna[2] = dna[2];
    if (random(1) < 0.01) {
      this.dna[2] += random(0, 10);
    }

    this.dna[3] = dna[3];
    if (random(1) < 0.01) {
      this.dna[3] += random(0, 10);
    }
  }

  // update location
  this.update = function() {
    // this.health -= 0.005;

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
    let foodSteering = this.get(food, 0.4, this.dna[2]);
    let poisonSteering = this.get(poison, -10, this.dna[3]);

    foodSteering.mult(this.dna[0]);
    // poisonSteering.mult(this.dna[1]);

    this.applyForce(foodSteering);
    this.applyForce(poisonSteering);
  };

  this.copy = function() {
    if (random(1) < 0.001) {
      return new Ant(this.pos.x, this.pos.y, this.dna);
    } else {
      return null;
    }
  };

  this.get = function(list, point, inEye) {
    let record = Infinity;
    let closestThing = null;

    for (let i = list.length - 1; i >= 0; i--) {
      const d = this.pos.dist(list[i]);

      if (d < this.maxspeed) {
        // eat something
        list.splice(i, 1);
        // this.health += point;
      } else {
        // attracting to it
        if (d < record && d < inEye) {
          record = d;
          closestThing = list[i];
        }
      }
    }

    if (closestThing !== null) {
      return this.seek(closestThing);
    }

    return createVector(0, 0);
  };

  this.seek = function(target) {
    // desire veloctiy = target location - the particle location
    var desired = p5.Vector.sub(target, this.pos);

    // scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired - velocity
    const steer = p5.Vector.sub(desired, this.velocity);

    // streering = desire velocity - current velocity
    steer.limit(this.maxforce); // limit to maximum steering force

    // this.applyForce(steer);
    return steer;
  };

  this.decay = function() {
    return this.health < 0;
  };

  this.display = function() {
    if (debug) {
      // Draw a triangle rotated in the direction
      const theta = this.velocity.heading() + PI / 2;
      push();
      translate(this.pos.x, this.pos.y);
      rotate(theta);

      stroke(0, 255, 0);
      noFill();
      line(0, 0, 0, -this.dna[0] * 10);
      ellipse(0, 0, -this.dna[2] * 2);

      // stroke(255, 0, 0);
      // line(0, 0, 0, -this.dna[1] * 10);
      // ellipse(0, 0, -this.dna[3] * 2);

      const green = color(0, 255, 0);
      const red = color(255, 0, 0);
      const colr = lerpColor(red, green, this.health);

      fill(colr);
      stroke(colr);
      strokeWeight(1);
      beginShape();
      vertex(0, -this.r * 2);
      vertex(-this.r, this.r * 2);
      vertex(this.r, this.r * 2);
      endShape(CLOSE);

      pop();
    } else {
      image(ant, this.pos.x, this.pos.y, 30, 30);
    }
  };

  this.inBound = function() {
    const d = 5;
    var desired = null;

    if (this.pos.x < d) {
      desired = createVector(this.maxspeed, this.velocity.y);
    } else if (this.pos.x > width - d) {
      desired = createVector(-this.maxspeed, this.velocity.y);
    }

    if (this.pos.y < d) {
      desired = createVector(this.velocity.x, this.maxspeed);
    } else if (this.pos.y > height - d) {
      desired = createVector(this.velocity.x, -this.maxspeed);
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxspeed);
      const steerVector = p5.Vector.sub(desired, this.velocity);
      this.applyForce(steerVector);
    }
  };
}
