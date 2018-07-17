// Menoras
const numberOfMenoras = 30;
const menoraRadius = 20;
const menorasVerticalOffset = -menoraRadius;
const menorasVerticalSpread = 400;
const menoras = [];
for (let i = 0; i < numberOfMenoras; i++) {
  const x = random(menoraRadius, canvas.width - menoraRadius);
  const y = menorasVerticalOffset - i * menorasVerticalSpread;
  const menora = new Menora(x, y, menoraRadius);
  menora.isHelperRect = true;
  menoras.push(menora);
}

// Rabi
const rabiRadius = 50;
const rabi = new Rabi(400, canvas.height - rabiRadius, rabiRadius);
rabi.isHelperRect = true;

// Canvas Rect
const canvasRect = {
  x      : 0,
  y      : 0,
  width  : canvas.width,
  height : canvas.height
};

function visible(rect) {
  return collision(rect, canvasRect);
}

function handleInput() {
  if (inputs.left)       rabi.xPos             -= rabi.xPosDelta;
  if (inputs.up)       { rabi.leftArmRotation  += rabi.leftArmRotationDelta;
                         rabi.rightArmRotation += rabi.rightArmRotationDelta; }
  if (inputs.right)      rabi.xPos             += rabi.xPosDelta;
  if (inputs.down)     { rabi.leftArmRotation  -= rabi.leftArmRotationDelta;
                         rabi.rightArmRotation -= rabi.rightArmRotationDelta; }
}

(function frame() {
  // Setup
  requestAnimationFrame(frame);
  handleInput();
  background();

  // Menoras
  for (menora of menoras) {
    menora.rotate();
    menora.fall();
    menora.draw();
  }

  // Rabi
  rabi.rotateHead();
  rabi.rotateBody();
  rabi.rotateLeftArm();
  rabi.rotateRightArm();
  rabi.draw();
})();
