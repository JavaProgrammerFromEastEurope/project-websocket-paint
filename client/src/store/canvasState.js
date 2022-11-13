import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas = null;
  socket = null;
  sessionid = null;
  undoList = [];
  redoList = [];
  username = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSessionId(id) {
    this.sessionid = id;
  }

  setSocket(socket) {
    this.socket = socket;
  }

  setUsername(username) {
    this.username = username;
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  pushToUndo(data) {
    this.undoList.push(data);
  }

  pushToRedo(data) {
    this.redoList.push(data);
  }

  undo() {
    const context = this.canvas.getContext("2d");
    if (this.undoList.length > 0) {
      const dataUrl = this.undoList.pop();
      this.redoList.push(this.canvas.toDataUrl());
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    } else {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  redo() {
    const context = this.canvas.getContext("2d");
    if (this.redoList.length > 0) {
      const dataUrl = this.redoList.pop();
      this.undoList.push(this.canvas.toDataUrl());
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }
}

export default new CanvasState();
