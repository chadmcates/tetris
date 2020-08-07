class Controller {

    constructor(piece, board, game) { //Params: [the first piece to control], [the game board]

        //An internal variable that refers to the piece currently being controlled
        this.piece = piece;

        //Creates an event based controller that controls whatever piece "this.piece" refers to
        document.addEventListener("keydown", evt => {

            switch(evt.keyCode) 
            {
                case 32: //Rotate
                    if( this.piece.canRotate(board) )
                        this.piece.rotate(board);
                    break;

                case 37: //Left
                    if ( this.piece.canMoveLeft(board) )
                        this.piece.move(-1, 0, board );
                    break;

                case 38: // Up
                    while( !game.update() ) {} //Repeatedly force consecutive updates until the current piece locks in place
                    break;

                case 39: //Right
                    if ( this.piece.canMoveRight(board) )
                    this.piece.move(1, 0, board );
                    break;

                case 40: // Down
                    if( this.piece.canMoveDown(board) )
                    this.piece.move(0, 1, board );
                    else 
                        game.update(); //Force an early update to lock the piece in place

                    break;

                case 67:
                    board.clearLine(19, this.piece);
            }
        });

    }

    //Updates the piece the controller refers to
    updatePiece(newpiece) {
        this.piece = newpiece;
    }

}
