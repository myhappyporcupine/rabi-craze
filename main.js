// Canvas Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const jew = new Player(400, 550, 50, ctx);
const wife = new Wife(200, 550, 50, ctx);

(function frame() {
  requestAnimationFrame(frame);

  background(ctx);

  jew.draw();
  wife.draw();
})();
