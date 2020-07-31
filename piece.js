class Piece {

    constructor(gameboard) {

		//Data model
        this.shape = new Array(3);
		this.color = Color.new();
		this.width = 3;
        this.x = 0;
		this.y = 0;

		//Create a new piece
		for (var row = 0; row < 3; row++) {
			//New row
			this.shape[row] = new Array(3);

			//Fill that row
			for (var column = 0; column < 3; column++) {
				this.shape[row][column] = new Block();
				this.shape[row][column].color = this.color;
			}
		}

		this.makePiece();

		//Check if new piece will overlap with any pieces already on the gameboard
		for (var column = 0; column < 3; column++) {
			for (var row = 2; row >= 0; row--) {
				if( this.shape[row][column].filled ) { //Block in shape found
					if ( gameboard.grid[row + this.y][column + this.x].filled ) { //Block exists under that block
						//console.log("Overlap");
					}
				}//Else move up a row because there is no shape at that part of the shape array
				//If we get to the top row and still find nothing go to the bottom row on the next column
			}
		}

		this.lockSelf = function (gboard) {
			for (var row = 0; row < 3; row++) {
				for (var column = 0; column < 3; column++) {
					if( this.shape[row][column].filled ) { //Block in shape found
						gboard.grid[row + this.y][column + this.x].locked = true;
					}
				}
			}
		}

		this.canMoveDown = function (gboard) {
			//Checking order
			//3 6 9
			//2 5 8
			//1 4 7
			for (var column = 0; column < 3; column++) {
				for (var row = 2; row >= 0; row--) {
					if( this.shape[row][column].filled ) { //Block in shape found
						if ( gboard.grid[row + this.y + 1][column + this.x].filled ) { //Block exists under that block
							return false;
						}
						else break;//Empty space under that block
							
					}//Else move up a row because there is no shape at that part of the shape array
					//If we get to the top row and still find nothing go to the bottom row on the next column
				}
			}
			return true;
		}

		this.canMoveLeft = function (gboard) {
			//Checking order
			//1 2 3
			//4 5 6
			//7 8 9
			if(this.x > 0) { //Can't move left if on left edge of board

				for (var row = 0; row < 3; row++) {
					for (var column = 0; column < 3; column++) {
						if( this.shape[row][column].filled ) { //Block in shape found
							if ( gboard.grid[row + this.y][column + this.x - 1].filled ) { //Block exists left of that block
								return false;
							}
							else break;//Empty space left of that block
								
						}
					}
				}

				return true;
			}

			else
				return false;
			
		}

		this.canMoveRight = function (gboard) {
			//Checking order
			//3 2 1
			//6 5 4
			//9 8 7
			if(this.x < (10 - this.width) ) { //Can't move right if on right edge of board

				for (var row = 0; row < 3; row++) {
					for (var column = 2; column >= 0; column--) {
						if( this.shape[row][column].filled ) { //Block in shape found
							if ( gboard.grid[row + this.y][column + this.x + 1].filled ) { //Block exists right of that block
								return false;
							}
							else break;//Empty space right of that block
								
						}
					}
				}

				return true;
			}

			else
				return false;
		}
	}

	makePiece() {
		var number = Math.floor(Math.random() * 7);

		switch (number) {
			case 0:
				this.shape[0][0].filled = false;
				this.shape[0][1].filled = true;
				this.shape[0][2].filled = false;
				this.shape[1][0].filled = true;
				this.shape[1][1].filled = true;
				this.shape[1][2].filled = true;
				this.shape[2][0].filled = false;
				this.shape[2][1].filled = false;
				this.shape[2][2].filled = false;
				this.width = 3;
				break;
			case 1:
				this.shape[0][0].filled = true;
				this.shape[0][1].filled = true;
				this.shape[0][2].filled = false;
				this.shape[1][0].filled = true;
				this.shape[1][1].filled = false;
				this.shape[1][2].filled = false;
				this.shape[2][0].filled = true;
				this.shape[2][1].filled = false;
				this.shape[2][2].filled = false;
				this.width = 2;
				break;
			case 2:
				this.shape[0][0].filled = false;
				this.shape[0][1].filled = true;
				this.shape[0][2].filled = false;
				this.shape[1][0].filled = true;
				this.shape[1][1].filled = true;
				this.shape[1][2].filled = false;
				this.shape[2][0].filled = true;
				this.shape[2][1].filled = false;
				this.shape[2][2].filled = false;
				this.width = 2;
				break;
			case 3:
				this.shape[0][0].filled = true;
				this.shape[0][1].filled = true;
				this.shape[0][2].filled = false;
				this.shape[1][0].filled = false;
				this.shape[1][1].filled = true;
				this.shape[1][2].filled = false;
				this.shape[2][0].filled = false;
				this.shape[2][1].filled = true;
				this.shape[2][2].filled = false;
				this.width = 2;
				break;
			case 4:
				this.shape[0][0].filled = true;
				this.shape[0][1].filled = false;
				this.shape[0][2].filled = false;
				this.shape[1][0].filled = true;
				this.shape[1][1].filled = true;
				this.shape[1][2].filled = false;
				this.shape[2][0].filled = false;
				this.shape[2][1].filled = true;
				this.shape[2][2].filled = false;
				this.width = 2;
				break;
			case 5:
				this.shape[0][0].filled = true;
				this.shape[0][1].filled = false;
				this.shape[0][2].filled = false;
				this.shape[1][0].filled = true;
				this.shape[1][1].filled = false;
				this.shape[1][2].filled = false;
				this.shape[2][0].filled = true;
				this.shape[2][1].filled = false;
				this.shape[2][2].filled = false;
				this.width = 1;
				break;
			default:
				this.shape[0][0].filled = true;
				this.shape[0][1].filled = true;
				this.shape[0][2].filled = false;
				this.shape[1][0].filled = true;
				this.shape[1][1].filled = true;
				this.shape[1][2].filled = false;
				this.shape[2][0].filled = false;
				this.shape[2][1].filled = false;
				this.shape[2][2].filled = false;
				this.width = 2;
				break;
		}
	}
}
