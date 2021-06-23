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

let board2; // Back gameboard

function addRandom(b) {

    let x = floor(random(cols));
    let y = floor(random(rows));

    b.setCellState(x, y, 1);
}

function setup() {
//createCanvas(800,800);
    createCanvas(cWidth*cols, cHeight*rows);
    clear();
    frameRate(8);
    board = new Board(cols, rows, cWidth, cHeight);
    board2 = new Board(cols, rows, cWidth, cHeight);
    /*
    // GLIDER
    board.setCellState(2, 3, 1); // set the STATE of a CELL to value
    board.setCellState(3, 4, 1);
    board.setCellState(4, 2, 1);
    board.setCellState(4, 3, 1);
    board.setCellState(4, 4, 1);
    */
    /*
    // Blinker
    board.setCellState(6, 2, 1);
    board.setCellState(6, 3, 1);
    board.setCellState(6, 4, 1);
    */
}

function draw() {
    clear();
    //background(35);
    //board.render(); // render gameboard
    if(!paused) {
        board.updateCells();
        board2.updateCells();
    }
    if(randomOn) {
        for(let i = 0; i <= 8; i++) addRandom(board);
        for(let i = 0; i <= 16; i++) addRandom(board2);
    }
    
    board2.renderGrid([79, 25, 79], 1, true, [66, 19, 66]);
    board2.renderCells([87, 34, 85]);

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