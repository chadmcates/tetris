class Board {

	constructor(drawctx) {
		this.drawctx = drawctx;

		this.width = 10;
		this.height = 20;

		this.blockwidth = 35;
		this.blockheight = 35;

		this.gutter = 3;
		this.corneroffset = 9;

		this.bgWidth =  (this.width  * this.blockwidth ) + (this.width  * this.gutter) + (this.corneroffset * 2) - this.gutter;
		this.bgHeight = (this.height * this.blockheight) + (this.height * this.gutter) + (this.corneroffset * 2) - this.gutter;


		this.makeGrid();
	}
	
	makeGrid() {
		this.grid = new Array(this.height);

		for (var row = 0; row < this.height; row++) {
			this.grid[row] = new Array(this.width);
			for (var column = 0; column < this.width; column++) {
				this.grid[row][column] = new Block();

				if (row == this.height)
					this.grid[row][column].filled = true;
			}
		}
	}

	renderSelf() {
		
		this.drawctx.fillStyle = "#000000";
		this.drawctx.fillRect(0, 0, this.bgWidth, this.bgHeight); //posx, posy, width, height (posx & posy refer to upper left corner)

		//Fill blocks based on array of block data called "grid"
		for (var row = 0; row < this.height; row++) {
			for (var column = 0; column < this.width; column++) {

				//If a block in the grid is "filled" then draw it
				if (this.grid[row][column].filled) {

					//Select color to draw with from the color data stored in the block
					this.drawctx.fillStyle = this.grid[row][column].color;

					//Draw block in its color
					this.drawctx.fillRect((column * this.blockwidth) + (column * this.gutter) + this.corneroffset,
						(row * this.blockheight) + (row * this.gutter) + this.corneroffset,
						this.blockwidth, this.blockheight);

					//If block is not in a locked state then draw an internal block to indicate this
					if ( !this.grid[row][column].locked ) {
						this.drawctx.fillStyle = Color.getDark(this.grid[row][column].color);
						this.drawctx.fillRect((column * this.blockwidth + 8) + (column * this.gutter) + this.corneroffset,
							(row * this.blockheight + 8) + (row * this.gutter) + this.corneroffset,
							this.blockwidth - 16, this.blockheight - 16);
					}

				}

			}
		}
	}

	clearFullLines(piece) {
		for (var row = 0; row < 20; row++) {
			var fullBlocks = 0;
			for (var column = 0; column < 10; column++) {
				if(this.grid[row][column].filled == true)
					fullBlocks++;
			}
			if(fullBlocks == 10)
				this.clearLine(row, piece);
		}
	}

	clearLine(line, piece) {

		/* //Erase current piece
		for (var row = 0; row < 3; row++) {
			for (var column = 0; column < 3; column++) {
				if(piece.shape[row][column].filled && !piece.shape[row][column].locked) { //Only erases a piece if it is not locked
					this.grid[piece.y + row][piece.x + column].color = piece.color;
					this.grid[piece.y + row][piece.x + column].filled = false;
					this.grid[piece.y + row][piece.x + column].locked = false;
				}
			}
		} */

		//Copy lines above the line to be cleared downward
		for (var row = line; row >= 0; row--) {
			for (var column = 0; column < 10; column++) {
					
				if(row != 0)
					this.grid[row][column] = this.grid[row-1][column];
				else //Top row. Nothing above to copy so fill with empty blocks
					this.grid[0][column] = new Block();
				
			}
		}
		
		/* //Redraw it
		for (var row = 0; row < 3; row++) {
			for (var column = 0; column < 3; column++) {
				if(piece.shape[row][column].filled) {
					this.grid[piece.y + row][piece.x + column].color = piece.color;
					this.grid[piece.y + row][piece.x + column].filled = true;
					this.grid[piece.y + row][piece.x + column].locked = piece.shape[row][column].locked;
				}
			}
		} */
	}
}

