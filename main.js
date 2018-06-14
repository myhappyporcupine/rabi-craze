// Canvas Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const jew = new Player(400, 550, 50, ctx);
const wife = new Wife(200, 550, 50, ctx);

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
const inputs = {
  ArrowRight: false,
  ArrowLeft: false
}
document.addEventListener('keydown', (event) => {
  inputs[event.key] = true;
});
document.addEventListener('keyup', (event) => {
  inputs[event.key] = false;
});


function draw() {
  requestAnimationFrame(draw);
  // Background
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Wife
  wife.rotateHead();
  wife.draw();

  // Jew
  if (inputs['ArrowRight']) {
    jew.xPos += jew.xPosDelta;
  }
  if (inputs['ArrowLeft']) {
    jew.xPos -= jew.xPosDelta;
  }
  jew.rotateHead();
  jew.draw();
}

draw();
