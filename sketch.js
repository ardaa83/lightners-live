let notes = [];
let targets = [150, 250];
let noteWidth = 60;
let noteHeight = 16;
let hitY = 500;
let score = 0;
let scrollOffset = 0;
let noteSpeed = 4;

let music; // 🎵 müzik objesi
let beatTimes = []; // 🕒 nota zamanları (isteğe bağlı senkron)

function preload() {
  soundFormats('mp3');
  music = loadSound('music.mp3');
}

function setup() {
  createCanvas(400, 600);
  frameRate(60);
  textAlign(CENTER, CENTER);

  // 🎵 Müzik başlat
  music.play();

  // 🔁 Otomatik nota üretimi (her 1 saniyede bir) — sonra senkronluya geçeceğiz
  setInterval(() => {
    let lane = floor(random(2));
    notes.push({
      x: targets[lane],
      y: -noteHeight,
      lane: lane,
      color: lane === 0 ? color(0, 255, 255) : color(255, 255, 0)
    });
  }, 1000);
}

function draw() {
  background(0);
  scrollOffset += noteSpeed;
  drawScrollingLines(scrollOffset);

  // Tuş çizgileri
  for (let i = 0; i < 2; i++) {
    noStroke();
    fill(30);
    rect(targets[i] - noteWidth / 2, hitY, noteWidth, noteHeight, 3);
    stroke(100, 255, 255);
    noFill();
    rect(targets[i] - noteWidth / 2, hitY, noteWidth, noteHeight, 3);
    fill(255);
    noStroke();
    text(i === 0 ? 'Z' : 'X', targets[i], hitY + noteHeight + 12);
  }

  // Notalar
  for (let i = notes.length - 1; i >= 0; i--) {
    let note = notes[i];
    note.y += noteSpeed;

    noStroke();
    fill(note.color);
    rect(note.x - noteWidth / 2, note.y, noteWidth, noteHeight, 3);

    if (note.y > height + 50) {
      notes.splice(i, 1);
    }
  }

  // Skor
  fill(255);
  textSize(18);
  text("Score: " + score, width / 2, 30);
}

function keyPressed() {
  let keyIndex = -1;
  if (key === 'z' || key === 'Z') keyIndex = 0;
  if (key === 'x' || key === 'X') keyIndex = 1;

  if (keyIndex !== -1) {
    for (let i = notes.length - 1; i >= 0; i--) {
      let note = notes[i];
      let centerY = note.y + noteHeight / 2;
      if (note.lane === keyIndex && abs(centerY - hitY) < 20) {
        score++;
        notes.splice(i, 1);
        break;
      }
    }
  }
}

function drawScrollingLines(offset) {
  stroke(40);
  let spacing = 60;

  for (let y = -spacing; y < height + spacing; y += spacing) {
    let scrolledY = y + (offset % spacing);
    line(100, scrolledY, 300, scrolledY);
  }

  stroke(0, 255, 255);
  noFill();
  rect(100, 0, 200, height);
}
