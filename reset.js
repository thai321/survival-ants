// For reseting the simulation

function reset() {
  w = 1;
  h = 1;
  type1 = false;
  type2 = false;
  type3 = false;
  debug = false;

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

function resetSketch() {
  ants = [];
  food = [];
  poison = [];
  debug = false;

  for (let i = 0; i < 20; i++) {
    const x = random(width);
    const y = random(height);
    ants[i] = new Ant(x, y);
  }

  for (let i = 0; i < 50; i++) {
    const x = Math.random() * (width - 40) + 40;
    const y = Math.random() * (height - 40) + 40;
    food.push(createVector(x, y));
  }

  for (let i = 0; i < 20; i++) {
    const x = Math.random() * (width - 40) + 40;
    const y = Math.random() * (height - 40) + 40;
    poison.push(createVector(x, y));
  }
}
