/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let compMoves = [];
let myMoves = [];
function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    var rowIdx0 = (rowIdx + 1)%3;
    var colIdx0 = (colIdx + 1)%3;
    let newValue = 1;
    compMoves.push({'ypos':rowIdx, 'xpos':colIdx});
    myMoves.push({'ypos':rowIdx0, 'xpos':colIdx0});
    console.log('compMoves', compMoves,'myMoves', myMoves);
    grid[colIdx][rowIdx] = newValue;
    grid[colIdx0][rowIdx0] = 2;
    checkWinner()
    renderMainGrid();
    addClickHandlers();
    
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}
function rowWiseWin(){
    let sumY0=0, sumY1=0, sumY2=0;
    if(myMoves.length>=3){
        for(var indx = 0; indx<myMoves.length;indx++){
            if(myMoves[indx].xpos == 0){
                sumY0+=myMoves[indx].ypos;
            }else if(myMoves[indx].xpos == 1){
                sumY1+=myMoves[indx].ypos;
            }else if(myMoves[indx].xpos == 2){
                sumY2+=myMoves[indx].ypos;
            }
        }
       
    }
    if(sumY0==3 || sumY1==3 ||sumY2==3){
        return true;
    }else{
        return false;
    }
}
function columnWin(){
    let sumY0=0, sumY1=0, sumY2=0;
    if(myMoves.length>=3){
        for(var indx = 0; indx<myMoves.length;indx++){
            if(myMoves[indx].ypos == 0){
                sumY0+=myMoves[indx].xpos;
            }else if(myMoves[indx].ypos == 1){
                sumY1+=myMoves[indx].xpos;
            }else if(myMoves[indx].ypos == 2){
                sumY2+=myMoves[indx].xpos;
            }
        }
       
    }
    if(sumY0==3 || sumY1==3 ||sumY2==3){
        return true;
    }else{
        return false;
    }
}
function diagonalWin(){
    let sumD=0;
    if(myMoves.length>=3){
        for(var indx = 0; indx<myMoves.length;indx++){
            if(myMoves[indx].ypos == 0 && myMoves[indx].xpos == 0){
                sumD+=1;
            }else if(myMoves[indx].ypos == 1 && myMoves[indx].xpos == 1){
                sumD+=1;
            }else if(myMoves[indx].ypos == 2 && myMoves[indx].xpos == 2){
                sumD+=1;
            }
        }
    }
    if(sumD==3){
        return true;
    }else{
        return false;
    }
}
function checkWinner(){
   if(rowWiseWin()){
       console.log("win");
   }else if(columnWin()){
    console.log("win");
   }else if(diagonalWin()){
    console.log("win");
   }
   
}

initializeGrid();
renderMainGrid();
addClickHandlers();
