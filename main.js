// Game Variables
let score = 0;
let frameCount = 0;
let menorasFrameCount = 0;

// Menoras
const numberOfMenoras = 30;
const menoraRadius = 20;
const menorasVerticalOffset = -1.5 * menoraRadius;
const menorasFrameOffset = 60;
const menoras = [];

// Rabi
const rabiRadius = 50;
const rabi = new Rabi(400, canvas.height - rabiRadius, rabiRadius);

// 2D Context Alterations
ctx.font = '24px serif';

function createMenora() {
  const x = randomInteger(menoraRadius, canvas.width - menoraRadius);
  const y = menorasVerticalOffset;
  const menora = new Menora(x, y, menoraRadius);
  menoras.push(menora);
}

function destroyMenora(index) {
  menoras.splice(index, 1);
}

function lost(menora) {
  return (menora.boundingRect().y > canvas.height);
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

  // Create Menora
  if (menorasFrameCount == 0) createMenora();

  // Update Menoras
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

  // Handle Menora Interaction
  for (let i = menoras.length-1; i >= 0; i--) {
    if (collision(menoras[i].boundingRect(), rabi.boundingRect())) {
      destroyMenora(i);
      score++;
    } else if (lost(menoras[i])) {
      destroyMenora(i);
    }
  }

  // Update Counts
  frameCount++;
  if (++menorasFrameCount > menorasFrameOffset) menorasFrameCount = 0;

  // Display Score
  ctx.fillText('Score: ' + score, 5, 24);
})();
