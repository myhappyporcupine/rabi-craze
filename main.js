// Canvas Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Collision
function collision(rect1, rect2) {
  return (((rect2.x >= rect1.x && rect2.x <= rect1.x + rect1.width) ||
           (rect2.x + rect2.width >= rect1.x && rect2.x + rect2.width <= rect1.x + rect1.width)) &&
          ((rect2.y >= rect1.y && rect2.y <= rect1.y + rect1.height) ||
           (rect2.y + rect2.height >= rect1.y && rect2.y + rect2.height <= rect1.y + rect1.height)))
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