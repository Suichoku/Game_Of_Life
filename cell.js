class Cell {
  
    constructor(x, y) {
        
        this.x = x;
        this.y = y;
        this.state = 0; // 0: DEAD 1: ALIVE
        this.neighbours = 0; // Stores how many neighbours cell has
    }
    // Render CELL as rectancle at the location based on the CELL size
    render(cWidth, cHeight, color) {

        fill(color);
        if(this.state) {

            rect(this.x * cWidth, this.y * cHeight, cWidth, cHeight);
        }
    }
    
    calcState() {
        if(this.state) {
            
            if( this.neighbours < 2 || 
                this.neighbours > 3 ) this.state = 0;

        } else if( this.neighbours == 3 ) this.state = 1;
    }
}