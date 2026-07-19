const player = { X: 0, Y: 0, Z: 0 };
let yaw = -90;
let pitch = 0;
let zoomAmount = 0;
let rectY = -400;
let gravity = 4;
let playerVelocityY = 0;
let playerGravity = 0.3;
let jumpForce = -6;
let isGrounded = false;

async function setup() {
  frameRate(120);
  noCursor();
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  colorMode(RGBHDR);
  rectMode(CENTER);
}

function draw() {
  background(194, 254, 255);

  if (document.KeyIsDown("Escape")) {
    document.exitPointerLock();
    cursor(ARROW);
  }

  let mx = typeof movedX !== 'undefined' ? movedX : 0;
  let my = typeof movedY !== 'undefined' ? movedY : 0;
  
  if (document.pointerLockElement) {
    yaw += mx * 0.1;
    pitch -= my * 0.1;
  }
  pitch = constrain(pitch, -89, 89);

  let lookX = cos(radians(yaw)) * cos(radians(pitch));
  let lookY = sin(radians(pitch));
  let lookZ = sin(radians(yaw)) * cos(radians(pitch));

  let moveX = cos(radians(yaw));
  let moveZ = sin(radians(yaw));
  let rightX = cos(radians(yaw + 90));
  let rightZ = sin(radians(yaw + 90));
  let moveSpeed = 4;

  if (document.KeyIsDown("KeyW")) {
    player.X += moveX * moveSpeed;
    player.Z += moveZ * moveSpeed;
  }
  if (document.KeyIsDown("KeyS")) {
    player.X -= moveX * moveSpeed;
    player.Z -= moveZ * moveSpeed;
  }
  if (document.KeyIsDown("KeyA")) {
    player.X -= rightX * moveSpeed;
    player.Z -= rightZ * moveSpeed;
  }
  if (document.KeyIsDown("KeyD")) {
    player.X += rightX * moveSpeed;
    player.Z += rightZ * moveSpeed;
  }

  if (document.KeyIsDown("Space") && isGrounded) {
    playerVelocityY = jumpForce;
    isGrounded = false;
  }

  playerVelocityY += playerGravity;
  player.Y += playerVelocityY;

  if (player.Y >= 0) {
    player.Y = 0;
    playerVelocityY = 0;
    isGrounded = true;
  }

  if (document.KeyIsDown("KeyQ")) {
    zoomAmount = lerp(zoomAmount, -20, 0.1);
  } else if (document.KeyIsDown("KeyE")) {
    zoomAmount = lerp(zoomAmount, 20, 0.1);
  } else {
    zoomAmount = lerp(zoomAmount, 0, 0.1);
  }

  let fov = radians(60 + zoomAmount);
  perspective(fov, width / height, 0.1, 2000);
  
  let eyeY = player.Y - 30;
  camera(
    player.X, eyeY, player.Z,
    player.X + lookX, eyeY + lookY, player.Z + lookZ,
    0, 1, 0
  );

  rectY += gravity;
  if (rectY > 0) {
    rectY = 0;
  }

  push();
  translate(0, rectY, 0);
  rotateX(HALF_PI);
  fill(124, 174, 81);
  noStroke();
  rect(0, 0, 4000, 4000);
  pop();

  push();
  translate(0, rectY + 0.1, 0);
  rotateX(HALF_PI);
  stroke(255);
  strokeWeight(2);
  let gridSize = 100;
  let gridExtent = 2000;
  for (let x = -gridExtent; x <= gridExtent; x += gridSize) {
    line(x, -gridExtent, x, gridExtent);
  }
  for (let z = -gridExtent; z <= gridExtent; z += gridSize) {
    line(-gridExtent, z, gridExtent, z);
  }
  pop();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function mousePressed() {
  window.focus();
  requestPointerLock();
  noCursor();
}
