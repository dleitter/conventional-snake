let snake;
let res = 20;
let food;
let w;
let h;
let gameOver = false;

function setup() {
  createCanvas(400, 400);
  w = floor(width / res);
  h = floor(height / res);
  frameRate(5);
  textAlign(CENTER, CENTER);
  snake = new Snake();
  spawnFood();
}

function spawnFood() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && !snake.runsIntoNeck(-1, 0)) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW && !snake.runsIntoNeck(1, 0)) {
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW && !snake.runsIntoNeck(0, 1)) {
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW && !snake.runsIntoNeck(0, -1)) {
    snake.setDir(0, -1);
  }
}

function draw() {
  if (gameOver) {
    if (keyIsPressed) {
      gameOver = false;
      snake = new Snake();
      spawnFood();
    }
  }

  scale(res);
  background(220);
  if (snake.eats(food)) {
    snake.grow();
    spawnFood();
  }
  snake.update();
  snake.show();

  if (snake.endGame()) {
    print("END GAME");
    background(255, 0, 0);
    gameOver = true;
    fill(0);
    textSize(2);
    text("Game Over", w / 2, h / 2);
    textSize(0.7);
    text("Press any key to restart", w / 2, h / 2 + 2);
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(w / 2), floor(h / 2));
    this.xdir = 0;
    this.ydir = 0;

    this.setDir = function (x, y) {
      this.xdir = x;
      this.ydir = y;
    };

    this.runsIntoNeck = function (x, y) {
      if (this.body.length < 2) {
        return false;
      }
      let head = this.body[this.body.length - 1].copy();
      let neck = this.body[this.body.length - 2].copy();
      return head.x + x === neck.x && head.y + y === neck.y;
    };

    this.update = function () {
      let head = this.body[this.body.length - 1].copy();
      this.body.shift();
      head.x += this.xdir;
      head.y += this.ydir;
      this.body.push(head);
    };

    this.show = function () {
      for (let i = 0; i < this.body.length; i++) {
        fill(0);
        noStroke();
        rect(this.body[i].x, this.body[i].y, 1, 1);
      }
    };

    this.eats = function (pos) {
      let x = this.body[this.body.length - 1].x;
      let y = this.body[this.body.length - 1].y;
      if (x == pos.x && y == pos.y) {
        food = createVector(-1, -1);
        return true;
      }
      return false;
    };

    this.grow = function () {
      let head = this.body[this.body.length - 1].copy();
      this.body.push(head);
    };

    this.endGame = function () {
      let x = this.body[this.body.length - 1].x;
      let y = this.body[this.body.length - 1].y;
      if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
        return true;
      }
      for (let i = 0; i < this.body.length - 1; i++) {
        let part = this.body[i];
        if (part.x == x && part.y == y) {
          return true;
        }
      }
      return false;
    };
  }
}
