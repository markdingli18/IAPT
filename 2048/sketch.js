let video;
let label = 'waiting...';

let classifier;

// STEP 1: Load the model!
function preload(){
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/uMTXWx-pf/')
}

const padding = 8; 
let board;

function setup() {
    let boardSize = 4;
    let padding = 8;
    
    let canvasSize = boardSize * 100 + boardSize * padding;
    createCanvas(canvasSize, canvasSize);
  
    // Create the video
    video = createCapture(VIDEO);
    video.hide();

    // STEP 2: Start classifying
    classifyVideo();
  
    textSize(36);
    textAlign(CENTER, CENTER);
    board = new Board(boardSize, 8);
}

// STEP 2 classify!
function classifyVideo(){
  classifier.classify(video, gotResults);
}

function draw() {
  image(video, 0, 0);
  textSize(32);
  fill(255);
  text(label, 10,50);

  board.draw();
}

function controlBoard() {
    if (label === 'left') {
        board.move(board.DIRECTIONS.LEFT);
    } else if (label === 'right') {
        board.move(board.DIRECTIONS.RIGHT);
    } else if (label === 'up') {
        board.move(board.DIRECTIONS.UP);
    } else if (label === 'down') {
        board.move(board.DIRECTIONS.DOWN);
    }
}

// STEP 3: Get the classification!
function gotResults(error, results){
  if(error){
    console.error(error);
    return;
  }
  label = results[0].label;
  controlBoard();
  classifyVideo();
}