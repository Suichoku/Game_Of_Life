// RULES
// Any live CELL with fewer than two live neighbours dies
// Any live CELL with two or three live neighbours lives
// Any live CELL with more than three live neighbours dies
// Any dead CELL with exactly three live neighbours becomes a live cell

// LIVE: < 2 -> DEAD
// LIVE: 2-3 -> LIVE
// LIVE: > 3 -> DEAD
// DEAD: = 3 -> LIVE

// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

let board;               // gameboard
let cWidth = 30;         // CELL width in pixels
let cHeight = cWidth;    // CELL height in pixels
let cols = 30;           // gameboard columns amount
let rows = 30;           // gameboard rows amount
let paused = true;
let randomOn = false;

let addRandom = count => {
    for(let i = 0; i < count; i++) {
        let x = floor(random(cols));
        let y = floor(random(rows));

        board.setCellState(x, y, 1);
    }
}

function setup() {
//createCanvas(800,800);
    createCanvas(cWidth*cols, cHeight*rows);
    frameRate(8);
    board = new Board(cols, rows, cWidth, cHeight);
    
    // GLIDER
    board.setCellState(2, 3, 1); // set the STATE of a CELL to value
    board.setCellState(3, 4, 1);
    board.setCellState(4, 2, 1);
    board.setCellState(4, 3, 1);
    board.setCellState(4, 4, 1);
    
    /*
    // Blinker
    board.setCellState(6, 2, 1);
    board.setCellState(6, 3, 1);
    board.setCellState(6, 4, 1);
    */
}

function draw() {
    background(20);
    //board.render(); // render gameboard
    if(!paused) {
        board.updateCells();
        board2.updateCells();
    }
    if(randomOn) {
        addRandom(5);
    }

    board.render(); // render gameboard
}

function mousePressed() {
    // Find index and toggle STATE of that CELL
    let pos = board.normalizeMouse(mouseX, mouseY);
    board.toggleCellState(pos.x, pos.y);
}

function keyPressed() {

    if( keyCode === 32 ) {
        paused = !paused;
    }
    if( keyCode === unchar('R')) {
        randomOn = !randomOn;
    }
}