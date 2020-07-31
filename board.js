class Board {

	constructor(drawctx) {

		this.width = 10;
		this.height = 20;

		this.blockwidth = 35;
		this.blockheight = 35;

		this.gutter = 3;
		this.corneroffset = 9;

		this.bgWidth = (this.width * this.blockwidth) + (this.width * this.gutter) + (this.corneroffset * 2) - this.gutter;
		this.bgHeight = (this.height * this.blockheight) + (this.height * this.gutter) + (this.corneroffset * 2)  - this.gutter;

		this.grid = new Array(this.height);


		for (var row = 0; row < this.height; row++) {
			this.grid[row] = new Array(this.width);
		}

		for (var row = 0; row < this.height; row++) {
			for (var column = 0; column < this.width; column++) {
				this.grid[row][column] = new Block();

				if(row == this.height-1) this.grid[row][column].filled = true; //-----------TEST IMPACT LAYER

			}
		}

	}
	

	renderSelf() {
		
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, this.bgWidth, this.bgHeight); //posx, posy, width, height (posx & posy refer to upper left corner)

		//Fill blocks based on array of block data called "grid"
		for (var row = 0; row < this.height; row++) {
			for (var column = 0; column < this.width; column++) {
				if (this.grid[row][column].filled) {
					ctx.fillStyle = this.grid[row][column].color;
					ctx.fillRect((column * this.blockwidth) + (column * this.gutter) + this.corneroffset,
						(row * this.blockheight) + (row * this.gutter) + this.corneroffset,
						this.blockwidth, this.blockheight);

					if ( !this.grid[row][column].locked ) {
						ctx.fillStyle = "#222222";
						ctx.fillRect((column * this.blockwidth + 8) + (column * this.gutter) + this.corneroffset,
							(row * this.blockheight + 8) + (row * this.gutter) + this.corneroffset,
							this.blockwidth - 16, this.blockheight - 16);
					}

				}
			}
		}
	}


}

