// For creating food with mouse functionality

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
  if (
    mouseX > 20 &&
    mouseX < width - 20 &&
    mouseY > 20 &&
    mouseY < height - 20
  ) {
    food.push(createVector(mouseX, mouseY));
  }
}
