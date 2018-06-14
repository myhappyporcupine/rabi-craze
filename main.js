// Canvas Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const jew = new Player(400, 550, 50, ctx);
const wife = new Wife(200, 550, 50, ctx);

function handleInput() {
  if (inputs.left)    jew.xPos             -= jew.xPosDelta;
  if (inputs.up)    { jew.leftArmRotation  += jew.leftArmRotationDelta;
                      jew.rightArmRotation += jew.rightArmRotationDelta; }
  if (inputs.right)   jew.xPos             += jew.xPosDelta;
  if (inputs.down)  { jew.leftArmRotation  -= jew.leftArmRotationDelta;
                      jew.rightArmRotation -= jew.rightArmRotationDelta; }

  if (inputs.a)       wife.xPos             -= wife.xPosDelta;
  if (inputs.w)     { wife.leftArmRotation  += wife.leftArmRotationDelta;
                      wife.rightArmRotation += wife.rightArmRotationDelta; }
  if (inputs.d)       wife.xPos             += wife.xPosDelta;
  if (inputs.s)     { wife.leftArmRotation  -= wife.leftArmRotationDelta;
                      wife.rightArmRotation -= wife.rightArmRotationDelta; }
}

(function frame() {
  requestAnimationFrame(frame);

  background(ctx);

  handleInput();

  jew.draw();
  wife.draw();
})();
