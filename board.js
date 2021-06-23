class Board extends Grid{
  
    constructor(bWidth, bHeight, cWidth=-1, cHeight=-1) {

        super(bWidth, bHeight, cWidth, cHeight);
        // create 2dArray of CELLs with STATE 0 (Dead)
        this.cells = [];
        for(let y = 0; y < bHeight; y++) {

            let temp = [];
            for(let x = 0; x < bWidth; x++) temp.push( new Cell(x,y) );

            this.cells.push(temp);
        }
    }
    // Toggle STATE of the CELL at given position (p5.Vector)
    toggleCellState(xIndex, yIndex) {
        let temp = this.cells[yIndex][xIndex].state
        this.cells[yIndex][xIndex].state = (temp + 1) % 2; // swap state of cell
    }
    // Set STATE of the CELL at given index to value
    setCellState(xIndex, yIndex, val) {

        this.cells[yIndex][xIndex].state = val % 2; // modulus normalizes val to 0 or 1
    }
    // Calculate amount of neighbours for given cell
    calcNeighbours(xIndex, yIndex) {
      
        let sum = 0;
      
        for(let yOff = -1; yOff <= 1; yOff++) {
        
            let y = yIndex + yOff;
            // only loop xIndex if yIndex is within boundaries
            if(y >= 0 && y < this.cells.length) {

                for(let xOff=-1; xOff<=1; xOff++) {
            
                    let x = xIndex + xOff;
                    // skip cell itself
                    if(xOff == 0 && yOff == 0) continue;

                    if(x >= 0 && x < this.cells[y].length) {

                        sum += this.cells[y][x].state
                    }
                }          
            }
        }
        //if(sum > 0) console.log(`x:${xIndex} y:${yIndex} sum: ${sum}`);

        this.cells[yIndex][xIndex].neighbours = sum;
    }
    // Updates CELL STATEs based on the rules
    updateCells() {
        // Flatten 2D cells array to 1D array
        let cells1D = [].concat(...this.cells); 
        // Calculate how many NEIGHBOURS CELL has
        cells1D.map( cell => this.calcNeighbours(cell.x, cell.y) );
        // Update STATE based on the NEIGHBOURS
        cells1D.map( cell => cell.calcState() );
    }
    // Render CELL STATEs (Dead/Alive)
    renderCells(color=[220,220,255]) {
        this.cells.map( i => i.map( cell => (
            cell.render( this.cWidth, this.cHeight, color )
        )));
    }
    // Render game
    render() {

        this.renderGrid([0,0], 1, false, [0,0]);
        this.renderCells([222, 109, 216]);
    }

}