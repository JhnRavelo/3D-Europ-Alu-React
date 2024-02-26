const generateColor = () => {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);

  var color = "rgb(" + red + "," + green + "," + blue + ")";

  return color;
};

export default generateColor;
