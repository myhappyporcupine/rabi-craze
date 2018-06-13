// Canvas Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Collision
function collision(rect1, rect2) {
  const x1 = rect1.x,
        y1 = rect1.y,
        w1 = rect1.width,
        h1 = rect1.height,
        x2 = rect2.x,
        y2 = rect2.y,
        w2 = rect2.width,
        h2 = rect2.height;

  return ( x1 - w2 <= x2 && x2 <= x1 + w1 &&
           y1 - h2 <= y2 && y2 <= y1 + h1    )
}

// Input Handling
inputs = {
  ArrowRight: false,
  ArrowLeft: false
}
document.addEventListener('keydown', (event) => {
  inputs[event.key] = true;
});
document.addEventListener('keyup', (event) => {
  inputs[event.key] = false;
});

// Player
const jew = new Player(400, 550, 50, ctx);
let score = 0;

// Collectibles
const menoras = [];
for (i = 0; i < 50; i++) {
  const menora = new Collectible(Math.random() * (canvas.width - 20) + 10, i * (-200) - 50, 20, ctx);
  menoras.push(menora);
}

function draw() {
  requestAnimationFrame(draw);
  // Background
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Jew
  if (inputs['ArrowRight']) {
    jew.xPos += jew.xPosDelta;
  }
  if (inputs['ArrowLeft']) {
    jew.xPos -= jew.xPosDelta;
  }
  jew.rotateHead();
  jew.rotateLeftArm();
  jew.rotateRightArm();
  jew.draw();

  // Menoras
  for (i = menoras.length - 1; i >= 0; i--) {
    if (collision(menoras[i].boundingRect(), jew.boundingRect())) {
      console.log('collision!');
      menoras.splice(i, 1);
      score++;
    }
  }
  for (menora of menoras) {
    menora.fall();
    menora.rotate();
    menora.draw();
  }
}

draw();
