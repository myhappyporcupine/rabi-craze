// Canvas Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const rabi = new Rabi(400, 550, 50, ctx);
const wife = new Wife(200, 550, 50, ctx);

function handleInput() {
  if (inputs.left)       rabi.xPos             -= rabi.xPosDelta;
  if (inputs.up)       { rabi.leftArmRotation  += rabi.leftArmRotationDelta;
                         rabi.rightArmRotation += rabi.rightArmRotationDelta; }
  if (inputs.right)      rabi.xPos             += rabi.xPosDelta;
  if (inputs.down)     { rabi.leftArmRotation  -= rabi.leftArmRotationDelta;
                         rabi.rightArmRotation -= rabi.rightArmRotationDelta; }
	if (inputs.home)       rabi.headRotation     -= rabi.headRotationDelta;
	if (inputs.pageup)     rabi.headRotation     += rabi.headRotationDelta;
	if (inputs.end)        rabi.bodyRotation     -= rabi.bodyRotationDelta;
	if (inputs.pagedown)   rabi.bodyRotation     += rabi.bodyRotationDelta;
	if (inputs.enter)    { rabi.leftArmRotation   = 0;
                         rabi.rightArmRotation  = 0;
                         rabi.headRotation      = 0;
												 rabi.bodyRotation      = 0;                          }

  if (inputs.a)          wife.xPos             -= wife.xPosDelta;
  if (inputs.w)        { wife.leftArmRotation  += wife.leftArmRotationDelta;
                         wife.rightArmRotation += wife.rightArmRotationDelta; }
  if (inputs.d)          wife.xPos             += wife.xPosDelta;
  if (inputs.s)        { wife.leftArmRotation  -= wife.leftArmRotationDelta;
                         wife.rightArmRotation -= wife.rightArmRotationDelta; }
	if (inputs.q)          wife.headRotation     -= wife.headRotationDelta;
	if (inputs.e)          wife.headRotation     += wife.headRotationDelta;
	if (inputs.z)          wife.bodyRotation     -= wife.bodyRotationDelta;
	if (inputs.c)          wife.bodyRotation     += wife.bodyRotationDelta;
	if (inputs.r)        { wife.leftArmRotation   = 0;
                         wife.rightArmRotation  = 0;
                         wife.headRotation      = 0;
												 wife.bodyRotation      = 0;                          }
}

(function frame() {
  requestAnimationFrame(frame);

  background(ctx);

  handleInput();

  rabi.draw();
  wife.draw();
})();
