const canvas = document.createElement('canvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
document.body.appendChild(canvas);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }

  mult(vec) {
    this.x *= vec.x;
    this.y *= vec.y;
    return this;
  }

}

function start() {
  const drawRectangleAt = new Vector(100, 100)
  const squareSize = 20
  const moveSpeed = new Vector(0, 10)
  const drag = new Vector(0, 0.95)

  function loop() {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawRectangleAt.add(moveSpeed)
    moveSpeed.mult(drag)

    context.fillStyle = '#ffffff'
    context.fillRect(drawRectangleAt.x, drawRectangleAt.y, squareSize, squareSize);

    requestAnimationFrame(loop);
  }
  loop();
}

start();
