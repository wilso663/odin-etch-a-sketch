
class GridController {

  constructor(height, defaultColor = "#000000", isRainbow = false){
    this.height = height;
    this.sketchColor = defaultColor;
    this.isRainbow = isRainbow;
  }

  populateGrid() {
    //get grid container element
    //make and append a list of squares, where width * height = # of squares
    //set css to be grid template column repeat height 1 fr
    //set grid template rows repeat height 1fr
    //add mouse over listeners
  }  

  updateHeight(updatedHeight){
    this.height = updatedHeight;
    this.populateGrid();
  }

  setSketchColor(color) {
    this.sketchColor = color;
  }

  //repaint all grid squares white
  eraseSketch() {
    const grids = document.querySelectorAll('.grid-square');
    grids.forEach((square) => {
      square.style.backgroundColor = "#FFFFFF";
    })
  }

  setIsRainbow(value){
    this.isRainbow = value;
  }

  //Return a random hex number 000000 to FFFFFF as a string
  #getRandomColor(){
    return `#${Math.floor(Math.random() * 16777216).toString(16)}`;
  }

  setRandomColor(){
    this.setSketchColor(this.#getRandomColor());
  }

  addMouseoverColorListeners() {
    const grids = document.querySelectorAll('.grid-square');
    grids.forEach((square) => {
      square.addEventListener('mouseover', () => {
        if(this.isRainbow){
          square.style.backgroundColor = this.#getRandomColor();
        } else {
          square.style.backgroundColor = this.sketchColor
        }
      });
    })
  }

}
const gridController = new GridController(16);
gridController.setIsRainbow(true);
gridController.addMouseoverColorListeners();