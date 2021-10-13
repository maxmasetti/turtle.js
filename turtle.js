/* Imposta il canvas come cartesiano, ovvero con il centro al centro e la y che cresce verso l'alto */
CanvasRenderingContext2D.prototype.setcartesian = function(c=false) {
  this.isCartesian = c
  if (c) {
    this.setTransform(1, 0, 0, -1, this.canvas.width/2, this.canvas.height/2)
  } else {
    this.setTransform(1, 0, 0, 1, 0, 0)
  }
  return this;
}

/* Va alla posizione (x, y) Per es. "goto(0, 0)" equivale a "home()" */
CanvasRenderingContext2D.prototype.goto = function(x=0, y=0) {
  this.x = x;
  this.y = y;
  return this;
}

/* Orienta la tartaruga in base all'angolo specificato */
CanvasRenderingContext2D.prototype.setheading = function(angle=0) {
  this.angle = angle % 360;
  return this;
}

/* Ruota in senso orario di un dato angolo in gradi */
CanvasRenderingContext2D.prototype.right = function(angle=0) {
  let c = 1 - 2 * (this.isCartesian || 0)
  this.angle = (this.angle || 0) + c * angle
  this.angle %= 360
  return this
}

/* Ruota in senso antiorario di un dato angolo in gradi */
CanvasRenderingContext2D.prototype.left = function(angle=0) {
  return this.right(-angle);
}

/* Si muove in avanti di un dato numero di pixel (distanza) */
CanvasRenderingContext2D.prototype.forward = function(len=0) {
  let x = this.x || 0;
  let y = this.y || 0;
  let angle = (this.angle || 0) / 180 * Math.PI;
  this.x = x + len * Math.cos(angle);
  this.y = y + len * Math.sin(angle);
  //var offx = Math.trunc(this.canvas.width / 2);
  //var offy = Math.trunc(this.canvas.height / 2);
  this.save();
  //this.translate(offx, offy);
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
CanvasRenderingContext2D.prototype.pencolor = function(color, sat=100, light=50) {
  let hue = parseFloat(color)
  if (isNaN(hue)) {
    this.strokeStyle = color
  } else {
    hue %= 360
    sat = Math.abs((1 * sat) || 100) % 101
    light = Math.abs((1 * light) || 50) % 101
    this.strokeStyle = `hsl( ${hue}, ${sat}%, ${light}%)`
    console.log(`hsl( ${hue}, ${sat}%, ${light}%)`)
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
