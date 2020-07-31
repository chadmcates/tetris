class Controller {

    constructor(piece, board, game) { //Params: [the first piece to control], [the game board]

        //An internal variable that refers to the piece currently being controlled
        this.piece = piece;

        //Creates an event based controller that controls whatever piece "this.piece" refers to
        document.addEventListener("keydown", evt => {

            switch(evt.keyCode) 
            {
                case 37: //Left
                    if ( this.piece.canMoveLeft(board) )
                        this.move(this.piece, board, -1, 0);
                    break;

                case 38: // Up
                    while( !game.update() ) {} //Repeatedly force consecutive updates until the current piece locks in place
                    break;

                case 39: //Right
                    if ( this.piece.canMoveRight(board) )
                        this.move(this.piece, board, 1, 0);
                    break;

                case 40: // Down
                    if( this.piece.canMoveDown(board) )
                        this.move(this.piece, board, 0, 1);
                    else 
                        game.update(); //Force an early update to lock the piece in place

                    break;
            }
        });

    }

    //Updates the piece the controller refers to
    updatePiece(newpiece) {
        this.piece = newpiece;
    }


    //Move the piece relative to its current position
    move(piece, board, x, y) {

        //Erase current piece
        for (var row = 0; row < 3; row++) {
            for (var column = 0; column < 3; column++) {
                if (piece.shape[row][column].filled) {
                    board.grid[piece.y + row][piece.x + column].color = piece.color;
                    board.grid[piece.y + row][piece.x + column].filled = false;
                }
            }
        }

        //Move it
        piece.x += x;
        piece.y += y;

        //Redraw it
        for (var row = 0; row < 3; row++) {
            for (var column = 0; column < 3; column++) {
                if (piece.shape[row][column].filled) {
                    board.grid[piece.y + row][piece.x + column].color = piece.color;
                    board.grid[piece.y + row][piece.x + column].filled = true;
                }
            }
        }

    }

}
