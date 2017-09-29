CanvasRenderingContext2D.prototype.at = function(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

CanvasRenderingContext2D.prototype.turn = function(angle) {
  if (this.angle) {
    angle += this.angle;
  }
  this.angle = (angle % 360) || 0;
}

CanvasRenderingContext2D.prototype.go = function(len) {
  len = len || 0;
  var x = this.x || 0;
  var y = this.y || 0;
  var angle = (this.angle || 0) / 180 * Math.PI;
  this.beginPath();
  this.moveTo(x, y);
  this.x = x + len * Math.cos(angle);
  this.y = y + len * Math.sin(angle);
  this.lineTo(this.x, this.y);
  this.stroke();
  this.beginPath();
}
