class Controller {

    constructor(piece, board, game) { //Params: [the first piece to control], [the game board]

        //Internal variables that refer to whatever needs to be controlled
        this.piece = piece;
        this.board = board;
        this.game = game;
        
        //Give the new bound function a reference so that we can use this to deregister it later
        this.listenerFunction = this.handleKeyPress.bind(this);
        
        //Creates an event based controller that controls whatever piece "this.piece" refers to
        this.listener = document.addEventListener("keydown", this.listenerFunction );
    }

    handleKeyPress(evt) {

        if( !this.game.paused && !this.game.isOver ){
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

                case 38: //Up
                    while( !this.game.update() ) {} //Repeatedly force consecutive updates until the current piece locks in place
                    break;

                case 39: //Right
                    if ( this.piece.canMoveRight(this.board) )
                        this.piece.move(1, 0, this.board );
                    break;

                case 40: //Down
                    if( this.piece.canMoveDown(this.board) ){
                        this.piece.move(0, 1, this.board );
                    } else {
                        this.game.update(); //Force an early update to lock the piece in place
                    }
                    break;

                case 67: // "c"
                    this.game.pause();
                    break;

                case 86: // "v"
                    this.game.unpause();
                    //console.log("UnPaused");
                    break;

                case 82: // "r"
                    this.game.resetGame();
                    break;
            }            
        } else if( evt.keyCode == 86 && this.game.paused ) { //Allow unpausing keyboard input through even though paused
            this.game.unpause();
        } else if( evt.keyCode == 82 && this.game.isOver ) {
            this.game.resetGame();
        }


    }

    //Updates the piece the controller refers to
    updatePiece(newpiece) {
        this.piece = newpiece;
    }

    //When a controller is no longer needed its event listener must be deregistered
    deregisterListener() {
        document.removeEventListener("keydown", this.listenerFunction );
    }

}
