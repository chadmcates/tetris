class Controller {

    constructor(piece, board, game) { //Params: [the first piece to control], [the game board]

        //An internal variable that refers to the piece currently being controlled
        this.piece = piece;
        this.board = board;
        this.game = game;
        this.listenerFunction = this.handleKeyPress.bind(this); //Give the new bound function a reference so that we can use this to deregister it later
        
        //Creates an event based controller that controls whatever piece "this.piece" refers to
        this.listener = document.addEventListener("keydown", this.listenerFunction );
    }

    handleKeyPress(evt) {

        switch(evt.keyCode) 
        {
            case 32: //Rotate
                if( this.piece.canRotate(this.board) )
                    this.piece.rotate(this.board);
                break;

            case 37: //Left
                if ( this.piece.canMoveLeft(this.board) )
                    this.piece.move(-1, 0, this.board );
                break;

            case 38: // Up
                while( !this.game.update() ) {} //Repeatedly force consecutive updates until the current piece locks in place
                break;

            case 39: //Right
                if ( this.piece.canMoveRight(this.board) )
                    this.piece.move(1, 0, this.board );
                break;

            case 40: // Down
                if( this.piece.canMoveDown(this.board) )
                this.piece.move(0, 1, this.board );
                else 
                    this.game.update(); //Force an early update to lock the piece in place

                break;

            case 67:
                this.board.clearLine(19, this.piece);
        }
    }

    //Updates the piece the controller refers to
    updatePiece(newpiece) {
        this.piece = newpiece;
    }

    deregisterListener() {
        document.removeEventListener("keydown", this.listenerFunction );
    }

}
