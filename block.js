class Block {
  constructor() {
    this.filled = false;
    this.locked = false; //Note: If a block is not locked it is part of an active piece
    this.color;
  }
}
