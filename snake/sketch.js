let video;
let label = 'waiting...';

let classifier;

// STEP 1: Load the model!
function preload(){
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/WkNAgbIia/')
}

let snake;
let rez = 20;
let food;
let w;
let h;

function setup() {
  createCanvas(600, 480);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();
  
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5);
  snake = new Snake();
  foodLocation();
}

// STEP 2 classify!
function classifyVideo(){
  classifier.classify(video, gotResults);
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);

}

function controlSnake() {
  if (label === 'left') {
    snake.setDir(-1, 0);
  } else if (label === 'right') {
    snake.setDir(1, 0);
  } else if (label === 'down') {
    snake.setDir(0, 1);
  } else if (label === 'up') {
    snake.setDir(0, -1);
  }
}

function draw() {
  
  background(220);
  image(video, 0, 0);
  textSize(32);
  fill(255);
  text(label, 10,50);
  
  scale(rez);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();


  if (snake.endGame()) {
    print("END GAME");
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}

// STEP 3: Get the classification!
function gotResults(error, results){
  if(error){
    console.error(error);
    return;
  }
  label = results[0].label;
  controlSnake();
  classifyVideo();
}