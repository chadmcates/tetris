class Game {

    constructor(context) {
        //References to the Draw & Game-Tick intervals so they can be deregistered when a new game is created
        this.renderInterval;
        this.updateInterval;

        //A canvas draw context that a game will draw to
        this.context = context;

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
            for (var row = 0; row < 3; row++) {
                for (var column = 0; column < 3; column++) {
                    if(this.piece.shape[row][column].filled) {
                        this.board.grid[this.piece.y + row][this.piece.x + column].color = this.piece.color;
                        this.board.grid[this.piece.y + row][this.piece.x + column].filled = true;
                    }
                }
            }

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
}
