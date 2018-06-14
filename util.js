const inputs = {
  left  : false,
  up    : false,
  right : false,
  down  : false,
  a     : false,
  w     : false,
  d     : false,
  s     : false
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft')  inputs.left  = true;
  if (event.key === 'ArrowUp')    inputs.up    = true;
  if (event.key === 'ArrowRight') inputs.right = true;
  if (event.key === 'ArrowDown')  inputs.down  = true;
  if (event.key === 'a')          inputs.a     = true;
  if (event.key === 'w')          inputs.w     = true;
  if (event.key === 'd')          inputs.d     = true;
  if (event.key === 's')          inputs.s     = true;
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowLeft')  inputs.left  = false;
  if (event.key === 'ArrowUp')    inputs.up    = false;
  if (event.key === 'ArrowRight') inputs.right = false;
  if (event.key === 'ArrowDown')  inputs.down  = false;
  if (event.key === 'a')          inputs.a     = false;
  if (event.key === 'w')          inputs.w     = false;
  if (event.key === 'd')          inputs.d     = false;
  if (event.key === 's')          inputs.s     = false;
});

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

function background(drawContext) {
  const ctx = drawContext;

  drawContext.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
