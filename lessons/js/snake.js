var startGame = function() {

  var game = new Game({
    width: 10,
    height: 10,
    pixelSize: 20,
    canvasId: "snake-game",
  });

  var apple = randomLocation(game.width, game.height);
  var snake = [{ top: 0, left: 2, direction: "right" },
               { top: 0, left: 1, direction: "right" },
               { top: 0, left: 0, direction: "right" }];

  game.onInput(function(input) {
    changeDirection(input, snake)
  });

  game.onTick(function() {
    snake = moveSnake(snake, game.width, game.height);
    if (collisionBetwixt(snake[0], apple)) {
      snake = growSnake(snake);
      apple = randomLocation(game.width, game.height);
    } else if(outOfBounds(snake, game.width, game.height) || ateItself(snake)) {
      game.end();
    } else {
      game.draw([{ pixels: snake, color: "green" }, { pixels: [apple], color: "red" }]);
    }
  });

  game.start();
};

var bodyWithoutHead = function(snake) {
  return snake.slice(1, snake.length);
};

var ateItself = function(snake) {
  return bodyWithoutHead(snake).some(function(segment) {
    return collisionBetwixt(snake[0], segment);
  });
};

var growSnake = function(snake) {
  var lastSegment = snake[snake.length - 1];
  return snake.concat({ top: lastSegment.top,
                        left: lastSegment.left,
                        direction: "none"});
};

var randomLocation = function(maxLeft, maxTop) {
  return {
    top: randomNumberUpTo(maxTop),
    left: randomNumberUpTo(maxLeft)
  };
};

var randomNumberUpTo = function(number) {
  return Math.floor(Math.random()*number);
};

var collisionBetwixt = function(coordinateA, coordinateB) {
  return coordinateA.top == coordinateB.top && coordinateA.left == coordinateB.left;
};

var changeDirection = function(keyCode, snake) {
  var direction = Game.KEY_MAPPING[keyCode];
  if (direction) {
    snake[0].direction = direction;
  }
};

var moveSegment = function(segment) {
  if (segment.direction == "down") {
    return { top: segment.top + 1, left: segment.left, direction: segment.direction };
  } else if (segment.direction == "right") {
    return { top: segment.top, left: segment.left + 1, direction: segment.direction };
  } else if (segment.direction == "up") {
    return { top: segment.top - 1, left: segment.left, direction: segment.direction };
  } else if (segment.direction == "left") {
    return { top: segment.top, left: segment.left - 1, direction: segment.direction };
  } else {
    return segment;
  }
};

var previousSegmentsDirection = function(snake, index) {
  var previousSegment = snake[index-1];
  if (previousSegment) {
    return previousSegment.direction;
  } else {
    return snake[index].direction;
  }
};

var moveSnake = function(snake) {
  return snake.map(function(segment) {
    return moveSegment(segment);
  }).map(function(movedSegment, i) {
    return { top: movedSegment.top, left: movedSegment.left, direction: previousSegmentsDirection(snake, i)}
  });
};

var outOfBounds = function(snake, width, height) {
  return snake.some(function(segment) {
    return segment.left >= width ||
           segment.left < 0 ||
           segment.top >= height ||
           segment.top < 0;
  });
};

startGame();
