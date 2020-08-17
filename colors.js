class Color {
  static new() {
    var number = Math.floor(Math.random() * 7);

    switch (number) {
      case 0:
        return "red";
      case 1:
        return "orange";
      case 2:
        return "yellow";
      case 3:
        return "green";
      case 4:
        return "blue";
      case 5:
        return "purple";
      default:
        return "white";
    }
  }

  static getDark(color) {
    switch (color) {
      case "red":
        return "darkred";
      case "orange":
        return "darkorange";
      case "yellow":
        return "gold";
      case "green":
        return "darkgreen";
      case "blue":
        return "darkblue";
      case "purple":
        return "darkmagenta";
      default: //White
        return "darkgray";
    }
  }
}
