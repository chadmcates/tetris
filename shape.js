class Shape {

    static lastId = "t1";
    static thisId = "t1";

    static newShapeArray() { 
        var shape = new Array(3);

        for (var row = 0; row < 3; row++) {
            
            //Create second dimension for each row
            shape[row] = new Array(3);

            //Fill each row with Block objects
            for (var column = 0; column < 3; column++) {
                shape[row][column] = new Block();
                //shape[row][column].color = piece.color;
            }
        }

        return shape;
    }

	static new() {
		var shape = Shape.newShapeArray();
        var number = Math.floor( Math.random() * 7 );
        Shape.lastId = Shape.thisId;

		switch (number) {
			case 0:
                Shape.thisId = "t1";
				return Shape.getShape("t1");
			case 1:
                Shape.thisId = "j1";
                return Shape.getShape("j1");
			case 2:
                Shape.thisId = "z1";
				return Shape.getShape("z1");
			case 3:
                Shape.thisId = "l1";
				return Shape.getShape("l1");
			case 4:
                Shape.thisId = "s1";
				return Shape.getShape("s1");
			case 5:
                Shape.thisId = "i1";
				return Shape.getShape("i1");
			default:
                Shape.thisId = "o1";
				return Shape.getShape("o1");
		}
    }

    static rotate(id, direction, virtual) {
        if(!virtual) Shape.lastId = Shape.thisId;

        var rotationNumber = parseInt( id.charAt(1), 10) + 1;

        if(rotationNumber == 5) rotationNumber = 1;

        var newId = id.charAt(0) + rotationNumber.toString();

        if(!virtual) Shape.thisId = newId;

        return Shape.getShape(newId);
    }
    
    static getShape(id) {
        var shape = Shape.newShapeArray();

        switch (id) {
			case "t1":
				shape[0][0].filled = false; shape[0][1].filled = true; shape[0][2].filled = false;
                shape[1][0].filled = false; shape[1][1].filled = true; shape[1][2].filled = true;
				shape[2][0].filled = false; shape[2][1].filled = true; shape[2][2].filled = false;
				return shape;
			case "t2":
                shape[0][0].filled = false; shape[0][1].filled = false; shape[0][2].filled = false;
                shape[1][0].filled = true;  shape[1][1].filled = true;  shape[1][2].filled = true;
				shape[2][0].filled = false; shape[2][1].filled = true;  shape[2][2].filled = false;
				return shape;
			case "t3":
				shape[0][0].filled = false; shape[0][1].filled = true; shape[0][2].filled = false;
				shape[1][0].filled = true;  shape[1][1].filled = true; shape[1][2].filled = false;
				shape[2][0].filled = false; shape[2][1].filled = true; shape[2][2].filled = false;
				return shape;
			case "t4":
				shape[0][0].filled = false; shape[0][1].filled = true;  shape[0][2].filled = false;
				shape[1][0].filled = true;  shape[1][1].filled = true;  shape[1][2].filled = true;
				shape[2][0].filled = false; shape[2][1].filled = false; shape[2][2].filled = false;
                return shape;
            case "j1":
                shape[0][0].filled = false; shape[0][1].filled = true;  shape[0][2].filled = true;
                shape[1][0].filled = false; shape[1][1].filled = true; shape[1][2].filled = false;
                shape[2][0].filled = false; shape[2][1].filled = true; shape[2][2].filled = false;
                return shape;
            case "j2":
                shape[0][0].filled = false; shape[0][1].filled = false; shape[0][2].filled = false;
                shape[1][0].filled = true;  shape[1][1].filled = true;  shape[1][2].filled = true;
                shape[2][0].filled = false; shape[2][1].filled = false; shape[2][2].filled = true;
                return shape;
            case "j3":
                shape[0][0].filled = false; shape[0][1].filled = true; shape[0][2].filled = false;
                shape[1][0].filled = false; shape[1][1].filled = true; shape[1][2].filled = false;
                shape[2][0].filled = true;  shape[2][1].filled = true; shape[2][2].filled = false;
                return shape;
            case "j4":
                shape[0][0].filled = true;  shape[0][1].filled = false; shape[0][2].filled = false;
                shape[1][0].filled = true;  shape[1][1].filled = true;  shape[1][2].filled = true;
                shape[2][0].filled = false; shape[2][1].filled = false; shape[2][2].filled = false;
                return shape;
            case "z1":
                shape[0][0].filled = false; shape[0][1].filled = false; shape[0][2].filled = true;
                shape[1][0].filled = false; shape[1][1].filled = true;  shape[1][2].filled = true;
                shape[2][0].filled = false; shape[2][1].filled = true;  shape[2][2].filled = false;
                return shape;
            case "z2":
                shape[0][0].filled = false; shape[0][1].filled = false; shape[0][2].filled = false;
                shape[1][0].filled = true;  shape[1][1].filled = true;  shape[1][2].filled = false;
                shape[2][0].filled = false; shape[2][1].filled = true;  shape[2][2].filled = true;
                return shape;
            case "z3":
                shape[0][0].filled = false; shape[0][1].filled = true;  shape[0][2].filled = false;
                shape[1][0].filled = true;  shape[1][1].filled = true;  shape[1][2].filled = false;
                shape[2][0].filled = true;  shape[2][1].filled = false; shape[2][2].filled = false;
                return shape;
            case "z4":
                shape[0][0].filled = true;  shape[0][1].filled = true;  shape[0][2].filled = false;
                shape[1][0].filled = false; shape[1][1].filled = true;  shape[1][2].filled = true;
                shape[2][0].filled = false; shape[2][1].filled = false; shape[2][2].filled = false;
                return shape;
            case "l1":
                shape[0][0].filled = false; shape[0][1].filled = true; shape[0][2].filled = false;
                shape[1][0].filled = false; shape[1][1].filled = true; shape[1][2].filled = false;
                shape[2][0].filled = false; shape[2][1].filled = true; shape[2][2].filled = true;
                return shape;
            case "l2":
                shape[0][0].filled = false; shape[0][1].filled = false; shape[0][2].filled = false;
                shape[1][0].filled = true;  shape[1][1].filled = true;  shape[1][2].filled = true;
                shape[2][0].filled = true;  shape[2][1].filled = false; shape[2][2].filled = false;
                return shape;
            case "l3":
                shape[0][0].filled = true;  shape[0][1].filled = true; shape[0][2].filled = false;
                shape[1][0].filled = false; shape[1][1].filled = true; shape[1][2].filled = false;
                shape[2][0].filled = false; shape[2][1].filled = true; shape[2][2].filled = false;
                return shape;
            case "l4":
                shape[0][0].filled = false; shape[0][1].filled = false; shape[0][2].filled = true;
                shape[1][0].filled = true;  shape[1][1].filled = true;  shape[1][2].filled = true;
                shape[2][0].filled = false; shape[2][1].filled = false; shape[2][2].filled = false;
                return shape;
            case "s1":
                shape[0][0].filled = false; shape[0][1].filled = true;  shape[0][2].filled = false;
                shape[1][0].filled = false; shape[1][1].filled = true;  shape[1][2].filled = true;
                shape[2][0].filled = false; shape[2][1].filled = false; shape[2][2].filled = true;
                return shape;
            case "s2":
                shape[0][0].filled = false; shape[0][1].filled = false; shape[0][2].filled = false;
                shape[1][0].filled = false; shape[1][1].filled = true;  shape[1][2].filled = true;
                shape[2][0].filled = true;  shape[2][1].filled = true;  shape[2][2].filled = false;
                return shape;
            case "s3":
                shape[0][0].filled = true;  shape[0][1].filled = false; shape[0][2].filled = false;
                shape[1][0].filled = true;  shape[1][1].filled = true;  shape[1][2].filled = false;
                shape[2][0].filled = false; shape[2][1].filled = true;  shape[2][2].filled = false;
                return shape;
            case "s4":
                shape[0][0].filled = false; shape[0][1].filled = true;  shape[0][2].filled = true;
                shape[1][0].filled = true;  shape[1][1].filled = true;  shape[1][2].filled = false;
                shape[2][0].filled = false; shape[2][1].filled = false; shape[2][2].filled = false;
                return shape;
            case "i1":
                shape[0][0].filled = false; shape[0][1].filled = true; shape[0][2].filled = false;
                shape[1][0].filled = false; shape[1][1].filled = true; shape[1][2].filled = false;
                shape[2][0].filled = false; shape[2][1].filled = true; shape[2][2].filled = false;
                return shape;
            case "i2":
                shape[0][0].filled = false; shape[0][1].filled = false; shape[0][2].filled = false;
                shape[1][0].filled = true;  shape[1][1].filled = true;  shape[1][2].filled = true;
                shape[2][0].filled = false; shape[2][1].filled = false; shape[2][2].filled = false;
                return shape;
            case "i3":
                shape[0][0].filled = false; shape[0][1].filled = true; shape[0][2].filled = false;
                shape[1][0].filled = false; shape[1][1].filled = true; shape[1][2].filled = false;
                shape[2][0].filled = false; shape[2][1].filled = true; shape[2][2].filled = false;
                return shape;
            case "i4":
                shape[0][0].filled = false; shape[0][1].filled = false; shape[0][2].filled = false;
                shape[1][0].filled = true;  shape[1][1].filled = true;  shape[1][2].filled = true;
                shape[2][0].filled = false; shape[2][1].filled = false; shape[2][2].filled = false;
                return shape;
            default:
                shape[0][0].filled = true;  shape[0][1].filled = true;  shape[0][2].filled = false;
                shape[1][0].filled = true;  shape[1][1].filled = true;  shape[1][2].filled = false;
                shape[2][0].filled = false; shape[2][1].filled = false; shape[2][2].filled = false;
                return shape;
        }
    }
}