// Game States
const GAME_STATES = {
  START : 0,
  PLAY  : 1,
  PAUSE : 2
}
let gameState = GAME_STATES.START;

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

// Handlers
document.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    switch (gameState) {
      case GAME_STATES.START:
        gameState = GAME_STATES.PLAY;
        break;
      case GAME_STATES.PLAY:
        gameState = GAME_STATES.PAUSE;
        break;
      case GAME_STATES.PAUSE:
        gameState = GAME_STATES.PLAY;
        break;
    }
  }
});

// Configuration
ctx.font = '24px serif';

// Functions
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
  if (inputs.left)  rabi.xPos -= rabi.xPosDelta;
  if (inputs.right) rabi.xPos += rabi.xPosDelta;
}

// Game Loop
(function frame() {
  // Setup
  requestAnimationFrame(frame);
  background();

  switch (gameState) {
    case GAME_STATES.START:
      ctx.fillText('Rabi Craze', 100, 100);
      ctx.fillText('Press space to play', 200, 200);
      break;

    case GAME_STATES.PLAY:
      // Input
      handleInput();

      // Menoras
      if (menorasFrameCount == 0) createMenora();
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

      // Collisions
      for (let i = menoras.length-1; i >= 0; i--) {
        if (collision(menoras[i].boundingRect(), rabi.boundingRect())) {
          destroyMenora(i);
          score++;
        } else if (lost(menoras[i])) {
          destroyMenora(i);
        }
      }

      // Score
      ctx.fillText('Score: ' + score, 5, 24);

      // Update
      frameCount++;
      if (++menorasFrameCount > menorasFrameOffset) menorasFrameCount = 0;

      break;

    case GAME_STATES.PAUSE:
      ctx.fillText('Paused', 100, 100);
      ctx.fillText('Press space to continue', 200, 200);
      break;
  }
})();
