let sound;
let fft;
const BAND_COUNT = 1024;
let rectWidth;

function preload() {
  song = loadSound("assets/summer-romance.mp3");
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  song.setVolume(0.1);
  song.play();
  fft = new p5.FFT(0.8, BAND_COUNT);
  rectWidth = width / BAND_COUNT;
}

function draw() {
  background(20);

  noStroke();
  const spectrum = fft.analyze();
  for (let i = 0; i < BAND_COUNT; i++) {
    const hue = map(i, 0, BAND_COUNT, 0, 1);
    const color = hslToRgb(hue, 1, 0.5);
    fill(color);
    const vol = -map(spectrum[i], 0, 255, 0.1, height / 2);
    rect(i * rectWidth, height / 2 - vol, rectWidth, vol * 2);
  }
}
