class Game {

    constructor(board) {
        this.board = board;
        this.piece = new Piece(board);
        this.controller = new Controller(this.piece, board, this);

        //First piece draw ---------------------->If any piece cells are already full game over
        for (var row = 0; row < 3; row++) {
            for (var column = 0; column < 3; column++) {
                if(this.piece.shape[row][column].filled) {
                    board.grid[this.piece.y + row][this.piece.x + column].color = this.piece.color;
                    board.grid[this.piece.y + row][this.piece.x + column].filled = true;
                }
            }
        }
    }

    //The main game update function.
    update() {
        if( this.piece.canMoveDown(this.board) )
            this.moveDown();
        else {
            this.piece.lockSelf(this.board);
            this.piece = new Piece(this.board);
            this.controller.updatePiece(this.piece);

            for (var row = 0; row < 3; row++) {//First piece draw ---------------------->If any piece cells are already full game over
                for (var column = 0; column < 3; column++) {
                    if(this.piece.shape[row][column].filled) {
                        this.board.grid[this.piece.y + row][this.piece.x + column].color = this.piece.color;
                        this.board.grid[this.piece.y + row][this.piece.x + column].filled = true;
                    }
                }
            }

            return true; //Lets calling code know that a piece has been locked
        }
    }

    //This method happens interframe of the actual draw calls
    moveDown() {
        //Erase current piece ------------------------------->Only erase piece cells, not empty ones
        for (var row = 0; row < 3; row++) {
            for (var column = 0; column < 3; column++) {
                if(this.piece.shape[row][column].filled) {
                    this.board.grid[this.piece.y + row][this.piece.x + column].color = this.piece.color;
                    this.board.grid[this.piece.y + row][this.piece.x + column].filled = false;
                }
            }
        }

        //Move it down
        this.piece.y++;

        //Redraw it ------------------------------->Only erase piece cells, not empty ones
        for (var row = 0; row < 3; row++) {
            for (var column = 0; column < 3; column++) {
                if(this.piece.shape[row][column].filled) {
                    this.board.grid[this.piece.y + row][this.piece.x + column].color = this.piece.color;
                    this.board.grid[this.piece.y + row][this.piece.x + column].filled = true;
                }
            }
        }
    }
}
