import Tool from "./Tool";

class Line extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
    this.name = "Line";
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseDownHandler(event) {
    this.mouseDown = true;
    this.currentX = event.pageX - event.target.offsetLeft;
    this.currentY = event.pageY - event.target.offsetTop;
    this.ctx.beginPath();
    this.ctx.moveTo(this.currentX, this.currentY);
    this.saved = this.canvas.toDataURL();
  }

  mouseUpHandler(event) {
    this.mouseDown = false;
  }

  mouseMoveHandler(event) {
    if (this.mouseDown) {
      this.draw(
        event.pageX - event.target.offsetLeft,
        event.pageY - event.target.offsetTop
      );
    }
  }

  draw(x, y) {
    const img = new Image();
    img.src = this.saved;
    img.onload = async () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(this.currentX, this.currentY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    };
    img.onload.bind(this);
  }
}

export default Line;
