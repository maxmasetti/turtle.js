/* Python Turtle-like canvas library */

/* Va alla posizione (x, y) Per es. "goto(0, 0)" equivale a "home()" */
CanvasRenderingContext2D.prototype.goto = function(x, y) {
  this.x = x || 0;
  this.y = y || 0;
  return this;
}

/* Orienta la tartaruga in base all'angolo specificato */
CanvasRenderingContext2D.prototype.setheading = function(angle) {
  this.angle = (angle % 360) || 0;
  return this;
}

/* Ruota in senso orario di un dato angolo in gradi */
CanvasRenderingContext2D.prototype.right = function(angle) {
  if (this.angle) {
    angle += this.angle;
  }
  this.angle = (angle % 360) || 0;
  return this;
}

/* Ruota in senso antiorario di un dato angolo in gradi */
CanvasRenderingContext2D.prototype.left = function(angle) {
  return this.right(-angle);
}

/* Si muove in avanti di un dato numero di pixel (distanza) */
CanvasRenderingContext2D.prototype.forward = function(len) {
  len = len || 0;
  var x = this.x || 0;
  var y = this.y || 0;
  var angle = (this.angle || 0) / 180 * Math.PI;
  this.x = x + len * Math.cos(angle);
  this.y = y + len * Math.sin(angle);
  var offx = Math.trunc(this.canvas.width / 2);
  var offy = Math.trunc(this.canvas.height / 2);
  this.save();
  this.translate(offx, offy);
  if (this.ispenup) {
    this.moveTo(this.x, this.y);
  } else {
    this.beginPath();
    this.moveTo(x, y);
    this.lineTo(this.x, this.y);
    this.stroke();
    this.beginPath();
  }
  this.restore();
  return this;
}

/* Si muove indietro di un dato numero di pixel (distanza) */
CanvasRenderingContext2D.prototype.backward = function(len) {
  return this.forward(-len);
}

/* Imposta la larghezza della penna in pixel */
CanvasRenderingContext2D.prototype.pensize = function(dimension) {
  this.lineWidth = dimension;
  return this;
}

/* Imposta il colore della penna */
CanvasRenderingContext2D.prototype.pencolor = function(color) {
  var hue = parseFloat(color);
  if (!isNaN(hue)) {
    this.strokeStyle = 'hsl(' + (hue % 360) + ', 100%, 50%)';
  } else {
    this.strokeStyle = color;
  }
  return this;
}

/* Solleva la penna (per non scrivere quando si muove) */
CanvasRenderingContext2D.prototype.up =
CanvasRenderingContext2D.prototype.penup = function() {
  this.ispenup = true;
  return this;
}

/* Abbassa la penna per scrivere */
CanvasRenderingContext2D.prototype.down =
CanvasRenderingContext2D.prototype.pendown = function() {
  this.ispenup = false;
  return this;
}

/* Ritorna alla base, posizione (0, 0), e punta verso destra */
CanvasRenderingContext2D.prototype.home = function() {
  return this.goto(0, 0).setheading(0);
}

/* Cancella i disegni fatti dalla tartaruga sul canvas */
CanvasRenderingContext2D.prototype.clear = function() {
  this.clearRect(0, 0, this.canvas.width, this.canvas.height);
  return this;
}

/* Pulisce il canvas, come "clear()", e ripristina le impostazioni di default per la tartaruga */
CanvasRenderingContext2D.prototype.reset = function() {
  return this.clear().home().pensize(1).pencolor('black').down();
}
