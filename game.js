class Game {

    constructor(context, text) {
        //References to the Draw & Game-Tick intervals so they can be deregistered when a new game is created
        this.renderInterval;
        this.updateInterval;

        //A canvas draw context that a game will draw to
        this.context = context;

        //An HTML text element to give feedback to
        this.gameText = text;

        //Game pause state
        this.paused = false;

        //Set up Board, Piece, and Controller Objects
        this.board = new Board(this.context);

        this.piece = new Piece(this.board.width / 2 - 1);
        this.piece.new();

        this.controller = new Controller(this.piece, this.board, this);

        //Update hasn't happened yet so draw the piece to the board immediately
        this.piece.drawTo(this.board);
    }

    //The main game update function.
    update() {
        if( this.piece.canMoveDown(this.board) ) {
            this.piece.move(0 ,1, this.board);
        } else {
            this.piece.lockSelf(this.board);
            this.board.clearFullLines(this.piece);
            this.piece = new Piece(this.board.width / 2 - 1);
            this.piece.new();

            if( this.piece.overlaps(this.board) ) {
                console.log("Game Over");
                this.resetGame();
                return true;
            }
            
            //Tell the controller what the new piece is
            this.controller.updatePiece(this.piece);
            
            //Draw the new piece
            this.piece.drawTo(this.board);

            //Lets calling code know that a piece has been locked
            return true; 
        }
    }

    resetGame() {
        this.board = new Board(this.context);

        this.piece = new Piece(this.board.width / 2 - 1);
        this.piece.new();

        //On creation, controllers create an event listener. These need to be deregistered when no longer needed
        this.controller.deregisterListener();
        this.controller = new Controller(this.piece, this.board, this);

        clearInterval(this.renderInterval);
        clearInterval(this.updateInterval);

        this.renderInterval = setInterval( this.board.renderSelf.bind(this.board) , 1000 / RENDER_FPS );
        this.updateInterval = setInterval( this.update.bind(this) , 1000 / GAME_FPS );
        
        //Update hasn't happened yet so draw the piece to the board immediately
        this.piece.drawTo(this.board);
    }

    pause() {
        if(!this.paused) {
            this.paused = true;
            //this.controller.deregisterListener(); Cant do this because then you cant use the keyboard to unpause--------------<<<<<<<<<<<<<<<<<<<<
            clearInterval(this.renderInterval);
            clearInterval(this.updateInterval);
            this.gameText.innerHTML = "Paused";
            this.gameText.style.display = "block";            
        }

    }

    unpause() {
        if(this.paused){
            this.paused = false
            //this.controller = new Controller(this.piece, this.board, this);
            this.renderInterval = setInterval( this.board.renderSelf.bind(this.board) , 1000 / RENDER_FPS );
            this.updateInterval = setInterval( this.update.bind(this) , 1000 / GAME_FPS );
            this.gameText.style.display = "none";
        }
    }
}
