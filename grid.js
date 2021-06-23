class Grid {
  
    constructor(bWidth, bHeight, cWidth=-1, cHeight=-1) {

        // board dimensions have to be integers and cant be negative
        this.bWidth  = bWidth  > 0 ? floor(bWidth)  : 0;
        this.bHeight = bHeight > 0 ? floor(bHeight) : 0;
        // if statement to avoid division by zero
        if(this.bWidth > 0 && this.bHeight > 0) {
            
            this.cWidth  = cWidth  > 0 ? cWidth  : width  / bWidth;
            this.cHeight = cHeight > 0 ? cHeight : height / bHeight;
        } else {

            this.cWidth  = cWidth;
            this.cHeight = cHeight;
        }
    }
    
    // Render GRID graphic
    // lColor : grid line color (integer | array[int] : [1-4])
    // lWeight : grid line weight (integer)
    // bg : render background? (true | false)
    // bgColor : color of background (integer | array[int] : [1-4])
    renderGrid(lColor=0, lWeight=1, bg=false, bgColor=255) {

        stroke(lColor); strokeWeight(lWeight);
        let w = this.cWidth  * this.bWidth;
        let h = this.cHeight * this.bHeight;
        if( bg ) {

            fill(bgColor); rect(0, 0, w, h);
        }
        for(let x = 1; x < this.bWidth; x++) {

            line(x * this.cWidth, 0, x * this.cWidth, h);
        }
        for(let y = 1; y < this.bHeight; y++) {

            line(0, y * this.cHeight, w, y * this.cHeight);
        }
    }
    
    // Normalize position of MOUSE click to GRID index
    normalizeMouse(posX, posY) {

        let xIndex = floor(posX / this.cWidth);
        let yIndex = floor(posY / this.cHeight);

        return ( createVector(xIndex, yIndex) );
    }
}