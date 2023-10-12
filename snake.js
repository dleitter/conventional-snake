let snake;
let res = 20;
let food;
let w;
let h;

function setup() {
  createCanvas(400, 400);
  w = floor(width / res);
  h = floor(height / res);
  frameRate(5);
  snake = new Snake();
  spawnFood();
}

function spawnFood() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0, -1);
  }
}

function draw() {
  scale(res);
  background(220);
  if (snake.eats(food)) {
    snake.grow();
  }
  snake.update();
  snake.show();

  if (snake.endGame()) {
    print("END GAME");
    background(255, 0, 0);
    noLoop();
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
