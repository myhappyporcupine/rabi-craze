// Canvas Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const rabi = new Rabi(400, 550, 50, ctx);
const wife = new Wife(200, 550, 50, ctx);

function handleInput() {
  if (inputs.left)    rabi.xPos             -= rabi.xPosDelta;
  if (inputs.up)    { rabi.leftArmRotation  += rabi.leftArmRotationDelta;
                      rabi.rightArmRotation += rabi.rightArmRotationDelta; }
  if (inputs.right)   rabi.xPos             += rabi.xPosDelta;
  if (inputs.down)  { rabi.leftArmRotation  -= rabi.leftArmRotationDelta;
                      rabi.rightArmRotation -= rabi.rightArmRotationDelta; }

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

  rabi.draw();
  wife.draw();
})();
