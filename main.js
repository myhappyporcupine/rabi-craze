// Game Constants
const GAME_STATES = {
  START : 0,
  PLAY  : 1,
  PAUSE : 2,
  OVER  : 3
}
// Menoras
const numberOfMenoras = 30;
const menoraRadius = 20;
const menorasVerticalOffset = -1.5 * menoraRadius;
const menorasFrameOffset = 60;
const menoras = [];
// Rabi
const rabiRadius = 50;
const rabi = new Rabi(400, canvas.height - rabiRadius, rabiRadius);

// Game Over Animation Tweens
const headRotationTween     = new Tween(-Math.PI/8, Math.PI/8, 60, EASES.SINE, BEHAVIORS.REVERSE);
const bodyRotationTween     = new Tween(-Math.PI/16, Math.PI/16, 40, EASES.SINE, BEHAVIORS.REVERSE);
const leftArmRotationTween  = new Tween(Math.PI/4, Math.PI/2, 20, EASES.SINE, BEHAVIORS.REVERSE);
const rightArmRotationTween = new Tween(-Math.PI/6, Math.PI/6, 120, EASES.SINE, BEHAVIORS.REVERSE);

// Game Variables
let score = 0;
let frameCount = 0;
let menorasFrameCount = 0;
let menorasToGo = numberOfMenoras;
let gameState = GAME_STATES.START;

// DOM Configuration
// Font
ctx.font = '24px serif';
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
      if (menorasFrameCount == 0 && menorasToGo > 0) {
        menorasToGo--;
        createMenora();
      }
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

    case GAME_STATES.OVER:
      rabi.xPos = canvas.width / 2;
      rabi.headRotation     = headRotationTween.step();
      rabi.bodyRotation     = bodyRotationTween.step();
      rabi.leftArmRotation  = leftArmRotationTween.step();
      rabi.rightArmRotation = rightArmRotationTween.step();
      rabi.draw();
      ctx.fillText('Game Over', 100, 100);
      ctx.fillText('You\'ve collected ' + score + ' menoras out of ' + numberOfMenoras, 200, 200);
      break;
  }

  if (menorasToGo == 0 && menoras.length == 0) gameState = GAME_STATES.OVER;
})();
