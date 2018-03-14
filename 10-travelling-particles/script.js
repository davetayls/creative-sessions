const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
document.body.appendChild(canvas);

class Vector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static random(maxX = 1, maxY = 1, maxZ = 1) {
    return new Vector(
      Math.random() * maxX,
      Math.random() * maxY,
      Math.random() * maxZ
    );
  }

  clone() {
    return new Vector(this.x, this.y, this.z);
  }

  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
    this.z += vec.z;
  }

  sub(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    this.z -= vec.z;
  }

  mult(vec) {
    this.x *= vec.x;
    this.y *= vec.y;
    this.z *= vec.z;
  }

  towards(vec, amount) {
    this.x = this.towardsNumber(this.x, vec.x, amount);
    this.y = this.towardsNumber(this.y, vec.y, amount);
    this.z = this.towardsNumber(this.z, vec.z, amount);
  }

  numberDifference(a = 0, b = 0) {
    return a > b ? a - b : b - a;
  }

  towardsNumber(a, b, amount) {
    let diff = this.numberDifference(a, b) * amount;
    return a > b ? a - diff : a + diff;
  }

  getDiff(vec) {
    return new Vector(
      this.numberDifference(this.x, vec.x),
      this.numberDifference(this.y, vec.y),
      this.numberDifference(this.z, vec.z)
    );
  }

}

class Color extends Vector {
  static random(maxX = 1, maxY = 1, maxZ = 1) {
    return new Color(
      Math.floor(Math.random() * maxX),
      Math.floor(Math.random() * maxY),
      Math.floor(Math.random() * maxZ)
    );
  }

  toRGBA(opacity = 1) {
    return `rgba(${this.x}, ${this.y}, ${this.z}, ${opacity})`;
  }
}

class Particle {
  constructor(pos, movement) {
    this.positions = [pos];
    this.movement = movement;
    this.color = Color.random(255, 255, 255);
    this.size = 1 + (movement.x * .6);
  }

  draw() {
    this.positions.forEach((pos, i) => {
      let grey = i ? i / 10 : i;
      context.fillStyle = this.color.toRGBA(1 - grey);
      context.fillRect(pos.x, pos.y, this.size, this.size);
    });
  }

  move() {
    let pos = this.positions[0].clone();
    pos.add(this.movement);
    if (pos.x > canvas.width) pos.x = 0;
    this.positions.unshift(pos);
    this.positions.length = 10;
  }
}

let particles;
let mouse = new Vector();

function start() {
  particles = [];
  let total = 10;
  while (total--) {
    let p = new Particle(
      Vector.random(canvas.width, canvas.height),
      Vector.random(5, 1)
    );
    p.movement.x += 1;
    p.movement.y = 0;
    particles.push(p);
  }

  function loop() {
    context.globalCompositeOperation = "source-over";
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "lighter";

    particles.forEach((p) => {
      p.move();
      p.draw();
    });
    requestAnimationFrame(loop);
  }

  loop();
}

function mouseMove(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
}

canvas.addEventListener('mousemove', mouseMove, false);
start();
