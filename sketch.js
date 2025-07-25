let notes = [];
let targets = [150, 250];
let score = 0;

function setup() {
  createCanvas(400, 600);
  textAlign(CENTER, CENTER);
  frameRate(60);

  // Test için her saniyede bir nota üret
  setInterval(() => {
    let lane = random([0, 1]);
    notes.push({ x: targets[lane], y: 0, lane: lane });
  }, 1000);
}

function draw() {
  background(30);

  // Hedef alanlar
  for (let i = 0; i < 2; i++) {
    fill(60);
    rect(targets[i] - 25, height - 100, 50, 20);
    fill(255);
    text(i === 0 ? 'Z' : 'X', targets[i], height - 90);
  }

  // Notaları çiz ve güncelle
  for (let i = notes.length - 1; i >= 0; i--) {
    let note = notes[i];
    note.y += 4;

    fill(0, 255, 255);
    ellipse(note.x, note.y, 30);

    if (note.y > height + 50) {
      notes.splice(i, 1); // ekran dışına çıktıysa sil
    }
  }

  // Skor
  fill(255);
  textSize(20);
  text("Score: " + score, width / 2, 30);
}

function keyPressed() {
  let k = key.toUpperCase(); // küçük harf gelirse büyük yap

  let laneIndex = -1;
  if (k === 'Z') laneIndex = 0;
  else if (k === 'X') laneIndex = 1;

  if (laneIndex !== -1) {
    for (let i = notes.length - 1; i >= 0; i--) {
      let note = notes[i];
      let d = dist(note.x, note.y, targets[laneIndex], height - 90);
      if (d < 30) {
        score++;
        notes.splice(i, 1);
        break;
      }
    }
  }
}
