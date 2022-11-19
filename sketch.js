let song;
let fft;
const BAND_COUNT = 1024;
let rectWidth;

const promptDragDrop = () => {
  background(20);
  text("Drag and drop a song to begin", width / 2, height / 2 - 15);
  text("(or click anywhere for a demo song)", width / 2, height / 2 + 15);
};

const promptDrop = () => {
  background(20);
  text("Drop it like it's hot!", width / 2, height / 2);
};

const playDemo = () => playSong("assets/summer-romance.mp3");

const playSong = (file) => {
  if (song !== undefined) return;

  file = file.data ? file.data : file;

  song = loadSound(file, () => song.play());
  song.onended(reset);
  fft.setInput(song);
  rectWidth = width / BAND_COUNT;

  noFill();
  loop();
};

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  rectWidth = width / BAND_COUNT;
}

const reset = () => {
  noLoop();
  noStroke();
  fill("white");
  background(20);

  song = undefined;
  fft = new p5.FFT(0.8, BAND_COUNT);

  promptDragDrop();
};

function setup() {
  const cnv = createCanvas(innerWidth, innerHeight);

  cnv.dragOver(promptDrop);
  cnv.dragLeave(promptDragDrop);
  cnv.drop(playSong, promptDragDrop);
  cnv.mouseClicked(playDemo);

  textAlign(CENTER);
  textSize(20);

  reset();

  // song.play();
}

function draw() {
  if (song === undefined) return;

  background(20);

  noStroke();
  const spectrum = fft.analyze();
  for (let i = 0; i < BAND_COUNT; i++) {
    const hue = map(i, 0, BAND_COUNT, 0, 1);
    const color = hslToRgb(hue, 1, 0.5);
    fill(color);
    const vol = -map(spectrum[i], 0, 255, 0.1, height / 3);
    rect(i * rectWidth, height / 2 - vol, rectWidth, vol * 2);
  }
}
