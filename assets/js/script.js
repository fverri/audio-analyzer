let sound, fft;

function preload() {
  sound = loadSound("input.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT();
  sound.loop();
  let toggleBtn = select("#togglePlay");
  toggleBtn.mousePressed(toggleSound);
  noFill();
}

function draw() {
  background(255);
  let spectrum = fft.analyze();
  let rectWidth = width / spectrum.length;

  rectWidth = max(2, rectWidth);

  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    fill(0);
    rect(x, height, rectWidth, h);
  }
}

function toggleSound() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
