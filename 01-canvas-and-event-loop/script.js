// 1. Create the canvas, size it and attach it to the document
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
document.body.appendChild(canvas);

// Create the event loop and make the background black
function start() {
  function loop() {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(loop);
  }
  loop();
}

start();
