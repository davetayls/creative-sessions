const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
document.body.appendChild(canvas);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function start() {
  const drawRectangleAt = new Vector(100, 100)
  const squareSize = 20

  function loop() {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#ffffff'
    context.fillRect(drawRectangleAt.x, drawRectangleAt.y, squareSize, squareSize);

    requestAnimationFrame(loop);
  }
  loop();
}

start();
