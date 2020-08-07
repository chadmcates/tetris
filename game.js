class Game {

    constructor(context) {
        this.board = new Board(context);
        this.piece = new Piece(this.board.width / 2 - 1);
        this.piece.new();
        this.controller = new Controller(this.piece, this.board, this);

        //First piece draw ---------------------->If any piece cells are already full game over
        for (var row = 0; row < 3; row++) {
            for (var column = 0; column < 3; column++) {
                if(this.piece.shape[row][column].filled) {
                    this.board.grid[this.piece.y + row][this.piece.x + column].color = this.piece.color;
                    this.board.grid[this.piece.y + row][this.piece.x + column].filled = true;
                }
            }
        }
    }

    //The main game update function.
    update() {
        if( this.piece.canMoveDown(this.board) )
            this.piece.move(0 ,1, this.board);
        else {
            this.piece.lockSelf(this.board);
            this.board.clearFullLines(this.piece);
            this.piece = new Piece(this.board.width / 2 - 1);
            this.piece.new();
            this.controller.updatePiece(this.piece);
            
            //Draw the new piece
            for (var row = 0; row < 3; row++) {
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

    static log(string) {
        console.log(string);
    }
}
