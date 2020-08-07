class Piece {

    constructor(xEntrance) {

		this.shape = Shape.getShape("t1");
		this.id = "t1";
		this.color = Color.new();
		this.width = 3;
		this.height = 3;
		this.xEmpty = 0;
		this.yEmpty = 0;
        this.x = xEntrance;
		this.y = 0;

		//this.makeShape();
		this.width = this.calcWidth();
		this.height = this.calcHeight();
	}

	new() {
		this.shape = Shape.new();
		this.id = Shape.thisId;
	}

	touchingLeft() {
		if (this.x > 0)
			return false;

		else if(this.x == 0) {
			for (var row = 0; row < 3; row++) {
				if(this.shape[row][0].filled) {
					return true;
				}
			}
		}

		else if(this.x == -1) {
			for (var row = 0; row < 3; row++) {
				if(this.shape[row][1].filled) {
					return true;
				}
			}
		}

		else
			return true;
	}

	touchingRight() {
		if (this.x < 7)
			return false;

		else if(this.x == 7) {
			for (var row = 0; row < 3; row++) {
				if(this.shape[row][2].filled) {
					return true;
				}
			}
		}

		else if(this.x == 8) {
			for (var row = 0; row < 3; row++) {
				if(this.shape[row][1].filled) {
					return true;
				}
			}
		}

		else
			return true;
	}

	touchingBottom() {
		if (this.y < 17)
			return false;

		else if(this.y == 17) {
			for (var column = 0; column < 3; column++) {
				if(this.shape[2][column].filled) {
					return true;
				}
			}
		}

		else if(this.y == 18) {
			for (var column = 0; column < 3; column++) {
				if(this.shape[1][column].filled) {
					return true;
				}
			}
		}

		else
			return true;
	}

	canMoveRight(gboard) {
		//Checking order
		//3 2 1
		//6 5 4
		//9 8 7
		if( !this.touchingRight() ) { //Can't move right if on right edge of board

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

	canMoveLeft(gboard) {
		//Checking order
		//1 2 3
		//4 5 6
		//7 8 9
		if( !this.touchingLeft() ) { //Can't move left if on left edge of board

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

	canMoveDown(gboard) {
		//Checking order
		//3 6 9
		//2 5 8
		//1 4 7
		if( !this.touchingBottom() ) {
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
	}

	canRotate(gboard) {
		//Create a temporary piece with the shape of the rotation in question
		var tempPiece = new Piece(0);
		tempPiece.shape = Shape.rotate(this.id, 0, true);
		tempPiece.x = this.x;
		tempPiece.y = this.y;


		if(tempPiece.overlaps(gboard))
			return false;
		else
			return true;
	}

	move(x, y, gboard) { //Use without moving to force a redraw
		//Erase current piece
		for (var row = 0; row < 3; row++) {
			for (var column = 0; column < 3; column++) {
				if(this.shape[row][column].filled) {
					gboard.grid[this.y + row][this.x + column].color = this.color;
					gboard.grid[this.y + row][this.x + column].filled = false;
				}
			}
		}

		//Move it
		this.x += x;
		this.y += y;

		//Redraw it
		for (var row = 0; row < 3; row++) {
			for (var column = 0; column < 3; column++) {
				if(this.shape[row][column].filled) {
					gboard.grid[this.y + row][this.x + column].color = this.color;
					gboard.grid[this.y + row][this.x + column].filled = true;
				}
			}
		}
	}

	rotate(gboard) {
		//Erase current piece
		for (var row = 0; row < 3; row++) {
			for (var column = 0; column < 3; column++) {
				if(this.shape[row][column].filled) {
					gboard.grid[this.y + row][this.x + column].color = this.color;
					gboard.grid[this.y + row][this.x + column].filled = false;
				}
			}
		}

		this.shape = Shape.rotate(this.id, 0);
		this.id = Shape.thisId;
		this.width = this.calcWidth();
		this.height = this.calcHeight();

		//Redraw it
		for (var row = 0; row < 3; row++) {
			for (var column = 0; column < 3; column++) {
				if(this.shape[row][column].filled) {
					gboard.grid[this.y + row][this.x + column].color = this.color;
					gboard.grid[this.y + row][this.x + column].filled = true;
				}
			}
		}
	}

	//Simply changes data for 
	lockSelf(gboard) {
		for (var row = 0; row < 3; row++) {
			for (var column = 0; column < 3; column++) {
				if (this.shape[row][column].filled) { //Block in shape found
					gboard.grid[row + this.y][column + this.x].locked = true;
					this.shape[row][column].locked = true;
				}
			}
		}
	}

	//Check if new piece will overlap with any pieces already on the gameboard
	overlaps(gboard) {
		for (var row = 0; row < 3; row++) {
			for (var column = 0; column < 3; column++) {
				if (this.shape[row][column].filled) { //Block in shape found
					if(gboard.grid[row + this.y][column + this.x] === undefined ) { //Block in shape is out of bounds
						Game.log("Out of bounds");
						return true;
					}
					if (gboard.grid[row + this.y][column + this.x].locked) { //Locked block exists on game board at same position as piece block
						Game.log("Overlap");
						return true;
					}
				}
			}
		}

		return false;
	}

	calcWidth() {
		var width = 0;
		for (var column = 0; column < 3; column++) {
			for (var row = 0; row < 3; row++) {
				if(this.shape[row][column].filled) {
					width++; //This column has at least 1 filled block
					break; //Move to next column
				}
					
			}
		}

		return width;
	}

	calcHeight() {
		var height = 0;
		for (var row = 0; row < 3; row++) {
			for (var column = 0; column < 3; column++) {
				if(this.shape[row][column].filled) {
					height++; //This row has at least 1 filled block
					break; //Move to next row
				}
					
			}
		}
		
		return height;
	}

}
