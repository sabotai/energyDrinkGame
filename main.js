
var energyDrinkImg;
var energyDrink;
var canGroup;

var compImg, compSprite;
var windSprite;
var faceImg, figureSprite;

var dumbSprite = [];

var Y_AXIS = 1;
var X_AXIS = 2;

var c1, c2, shiftVar;

var alpha;

function preload(){
	energyDrinkImg = loadImage('assets/energyDrink1.png');
	compImg = loadImage('assets/laptop.png');
	faceImg = loadImage('assets/face.png');
	faceImg = loadImage('assets/figureTired.png');
	faceImg = loadImage('assets/figureTired2.png');
	faceImg = loadImage('assets/figureTired3.png');
	faceImg = loadImage('assets/figureTired4.png');
	faceImg = loadImage('assets/figureTired5.png');
}

function setup() {
  createCanvas(displayWidth, displayHeight);  
  stroke(255);    
  frameRate(30);

  canGroup = new Group();

  energyDrink = createSprite(0, 10);
  energyDrink.addImage(energyDrinkImg);
  energyDrink.scale =(0.3);

  canGroup.add(energyDrink);

  //windSprite = createSprite(displayWidth * 0.5, displayHeight * 0.25, displayWidth * 0.5, displayHeight * 0.75);


  energyDrink.setCollider("energyDrink");
  energyDrink.attractionPoint(.9, mouseX, mouseY);

  compSprite = createSprite(displayWidth/2, displayHeight * 0.7);
  compSprite.addImage(compImg);
  compSprite.scale =(0.9);



  figureSprite = createSprite(mouseX, mouseY);
  var figureAnimation = figureSprite.addAnimation("basic", "assets/figureTired3.png",  "assets/figureTired4.png",  "assets/figureTired5.png");
  figureSprite.addImage(faceImg);
  figureSprite.scale =(0.4);

}

function draw() { 
  smooth(4);
  

  canGroup.collide(canGroup);
  

  edgeCollision();
  //draw all the sprites added to the sketch so far
  //the positions will be updated automatically at every cycle
  drawBackground();
  drawSprites();
} 




function drawBackground(){
  	background(255,127,80);   
	strokeWeight(30);
	stroke(0);
	fill(255);


	quad(0.25 * displayWidth,	0.75 * displayHeight, 
		0.75 * displayWidth,	0.75 * displayHeight, 
		displayWidth,			1.2 * displayHeight,
		0,						1.2 * displayHeight);


	shiftVar =  (second() * 10) % 255;
	//console.log(shiftVar)

	opacity = 255;

  	c1 = color(80,80, shiftVar, opacity);
  	c2 = color(255-shiftVar, 102, 153, opacity);

  	setGradient(0.25 * displayWidth, 	-100, 
				0.5 * displayWidth,		0.65 * displayHeight, 	c1, c2, Y_AXIS);


	noFill();
	stroke(0);
	strokeWeight(25);


	rect(0.24 * displayWidth, 	-100, 
		0.51 * displayWidth,		0.65 * displayHeight);

	strokeWeight(30);

	rect(0.2 * displayWidth, 	-100, 
		0.6 * displayWidth,		0.70 * displayHeight);
}

function drawForeground(){

	opacity = 1;

  	c1 = color(180,180, shiftVar, opacity);
  	c2 = color(shiftVar, 202, 253, opacity);

  	setGradient(0,				 	0, 
				displayWidth,		displayHeight, 	c2, c1, Y_AXIS);

}


function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, Y_AXIS);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}

function edgeCollision(){


    //all sprites bounce at the screen edges
  for(var i=0; i<allSprites.length; i++) {
	  var s = allSprites[i];
	  if(s.position.x<0) {
	    s.position.x = 1;
	    s.velocity.x = abs(s.velocity.x);
	  }
	  
	  if(s.position.x>width) {
	    s.position.x = width-1;
	    s.velocity.x = -abs(s.velocity.x);
	    }
	  
	  if(s.position.y<0) {
	    s.position.y = 1;
	    s.velocity.y = abs(s.velocity.y);
	  }
	  
	  if(s.position.y>height) {
	    s.position.y = height-1;
	    s.velocity.y = -abs(s.velocity.y);
    } 
  }

//keep figure sprite on the bottom
  if (figureSprite.position.y < (0.7 * displayHeight)){
  	figureSprite.position.y = 0.7 * displayHeight;
  	console.log("sup");
  } else {
  	console.log("hey");

  }

}

function mousePressed() {

  var count=dumbSprite.length;

  energyDrink.attractionPoint(.9, mouseX, mouseY);
  dumbSprite[count] = createSprite(random(0,width),random(0,height));
  dumbSprite[count].setCollider("dumbSprite[count]");
  dumbSprite[count].setSpeed(random(2,3), random(0, 36000));
  dumbSprite[count].addImage(energyDrinkImg);
  dumbSprite[count].scale =(random(.01, .1));
  dumbSprite[count].collide(dumbSprite[count]);
  //rotate(random(0, 3));
  dumbSprite[count].rotationSpeed = 0.5;
  canGroup.add(dumbSprite[count]);

}

function mouseMoved() {
	figureSprite.attractionPoint(0.4, mouseX, displayHeight * 0.75);

  drawForeground();
}