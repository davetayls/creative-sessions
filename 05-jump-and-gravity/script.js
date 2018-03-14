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

  clone() {
    return new Vector(this.x, this.y, this.z);
  }

}

class Character {

  constructor(position) {
    this.currentPosition = position.clone()
    this.squareSize = 20
    this.jumpForce = 20
    this.move = new Vector(0, this.jumpForce)
    this.force = new Vector(0, 0.95)
  }

  update() {
    if (this.move.y > 0 && this.move.y < 1) {
      this.move.y = -1
      this.force.y = 1.1
    }

    this.currentPosition.add(this.move)
    this.move.mult(this.force)

    if (this.currentPosition.y < 0) {
      this.currentPosition.y = 0
    }
  }

  draw() {
    context.fillStyle = '#ffffff'
    context.fillRect(
      100 + this.currentPosition.x,
      height - 100 - this.currentPosition.y,
      this.squareSize,
      this.squareSize
    );
  }
}

function start() {
  const sonic = new Character(new Vector(0, 0))

  function loop() {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    sonic.update()
    sonic.draw()
    requestAnimationFrame(loop);
  }
  loop();
}

start();
