var Game = function(options) {
  this.canvas = document.getElementById(options["canvasId"]);
  this.context = this.canvas.getContext("2d");
  this.pixelSize = options["pixelSize"];

  this.width = options["width"];
  this.canvasWidth = this.width * this.pixelSize;

  this.height = options["height"];
  this.canvasHeight = this.height * this.pixelSize;

  this.tickCallbacks = [];
}

Game.KEY_MAPPING = {
  38: "up",
  40: "down",
  37: "left",
  39: "right"
}

Game.prototype.onInput = function(callback) {
  document.addEventListener('keydown', function(e) {
    if(Game.KEY_MAPPING[e.keyCode]) {
      e.preventDefault();
      callback(e.keyCode);
    }
  });
};

Game.prototype.draw = function(screen) {
  this.clear();
  this.drawScreen(screen);
};

Game.prototype.clear = function() {
  this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
}

Game.prototype.drawPixel = function(color, pixel) {
  this.context.fillStyle = color;
  this.context.fillRect(pixel.left*this.pixelSize, pixel.top*this.pixelSize, this.pixelSize, this.pixelSize);
}

Game.prototype.drawScreen = function (screen) {
  var ui = this;
  screen.forEach(function(object) {
    object.pixels.forEach(function(pixel) {
      ui.drawPixel(object.color, pixel);
    });
  });
};

Game.prototype.end = function() {
  alert("GAME OVER!");
  clearInterval(this.processId);
};

Game.prototype.start = function() {
  console.log('foo');
  var self = this;
  this.processId = setInterval(function() {
    self.tick();
  }, 250);
}

Game.prototype.onTick = function(callback) {
  this.tickCallbacks.push(callback);
}

Game.prototype.tick = function() {
  console.log('hahaha');
  this.tickCallbacks.forEach(function(callback) {
    callback();
  });
}
