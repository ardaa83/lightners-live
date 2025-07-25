let notes = [];
let lanes = ['Z', 'X'];
let targets = [150, 250];
let score = 0;

function setup() {
  createCanvas(400, 600);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(30);

  // Draw hit zones
  for (let i = 0; i < 2; i++) {
    fill(50);
    rect(targets[i] - 25, height - 100, 50, 20);
    fill(255);
    text(lanes[i], targets[i], height - 90);
  }

  // Update & draw notes
  for (let i = notes.length - 1; i >= 0; i--) {
    notes[i].y += 4;
    fill(0, 255, 255);
    ellipse(notes[i].x, notes[i].y, 30);

    // Missed note
    if (notes[i].y > height) {
      notes.splice(i, 1);
    }
  }

  fill(255);
  textSize(20);
  text("Score: " + score, width / 2, 30);
}

// Generate notes periodically
function keyPressed() {
  if (key === 'Z' || key === 'X') {
    let index = lanes.indexOf(key);
    if (index !== -1) {
      for (let i = notes.length - 1; i >= 0; i--) {
        let note = notes[i];
        let d = dist(note.x, note.y, targets[index], height - 90);
        if (d < 25) {
          score++;
          notes.splice(i, 1);
          return;
        }
      }
    }
  }
}

function mousePressed() {
  // Manual note spawn (for testing)
  let lane = floor(random(2));
  notes.push({ x: targets[lane], y: 0 });
}
