
class GridController {

  constructor(height, defaultColor = "#000000", isRainbow = false){
    this.height = height;
    this.sketchColor = defaultColor;
    this.isRainbow = isRainbow;
  }

  BLACK_COLOR = '#000000';
  WHITE_COLOR = '#FFFFFF';

  //If setting sketch color, turn rainbow mode off
  setSketchColor(color) {
    this.isRainbow = false;
    this.sketchColor = color;
  }

  //repaint all grid squares white
  eraseSketch() {
    const grids = document.querySelectorAll('.grid-square');
    grids.forEach((square) => {
      square.style.backgroundColor = this.WHITE_COLOR;
    })
  }

  setIsRainbow(value){
    this.isRainbow = value;
  }

  //Return a random hex number #000000 to #FFFFFF as a string
  #getRandomColor(){
    return `#${Math.floor(Math.random() * 16777216).toString(16)}`;
  }

  setRandomColor(){
    this.setSketchColor(this.#getRandomColor());
  }

  addColorOptionEventListeners() {
    const blackOption = document.querySelector('.color-options__black');
    blackOption.addEventListener('click', (e) => {
      this.setSketchColor(this.BLACK_COLOR);
    });

    const colorPicker = document.querySelector('.color-options__picker');
    colorPicker.addEventListener('input', (e) => {
      this.setSketchColor(colorPicker.value);
    })

    const eraserOption = document.querySelector('.color-options__white');
    eraserOption.addEventListener('click', (e) => {
      this.setSketchColor(this.WHITE_COLOR);
    });

    const resetOption = document.querySelector('.color-options__reset');
    resetOption.addEventListener('click', (e) => {
      this.eraseSketch();
    });

    const rainbowOption = document.querySelector('.color-options__rainbow');
    rainbowOption.addEventListener('click', (e) => {
      this.setIsRainbow(!this.isRainbow);
    });

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

  populateGrid() {
    //get grid container element
    //make and append grid-squares, where height * height = # of squares
    //set css to be grid template column repeat height 1 fr
    //set grid template rows repeat height 1fr
    const gridElement = document.querySelector('.grid');
    //Remove each item of the grid on rewrite
    while(gridElement.firstChild){
      gridElement.removeChild(gridElement.firstChild);
    }

    gridElement.style.gridTemplateColumns = `repeat(${this.height}, 1fr)`;
    gridElement.style.gridTemplateRows = `repeat(${this.height}, 1fr)`;
    for(let i = 0; i < this.height * this.height; i++){
      const gridSquare = document.createElement('div');
      gridSquare.classList.add('grid-square');
      gridElement.appendChild(gridSquare);
    } 

  }  

  updateHeight(updatedHeight){
    this.height = updatedHeight;
    this.populateGrid();
    this.addMouseoverColorListeners();
  }

  addSliderEventListeners() {
    const slider = document.querySelector('.grid-size-slider');
    const sliderValue = document.querySelector('#slider-value');

    sliderValue.textContent = this.height;
    slider.addEventListener('input', () => {
      sliderValue.textContent = slider.value;
    })
    //Only update the grid size on mouse release
    //Grid size updates are performance intensive
    slider.addEventListener('mouseup', (event) => {
      this.updateHeight(slider.value);
    });
  }

}

const colorPickerValue = document.querySelector('.color-options__picker').value;
const gridController = new GridController(16);
gridController.populateGrid();
gridController.setSketchColor(colorPickerValue);
gridController.addMouseoverColorListeners();
gridController.addColorOptionEventListeners();
gridController.addSliderEventListeners();