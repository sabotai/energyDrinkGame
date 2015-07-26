
var img;
var imageSprite;
var dumbSprite = [];
var count = 0;

function preload(){
	img=loadImage('assets/energyDrink1.png');
}

function setup() {
  createCanvas(displayWidth, displayHeight);  
  stroke(255);    
  frameRate(30);

  imageSprite = createSprite(0, 10);
  imageSprite.addImage(img);
  imageSprite.scale =(0.1);

  imageSprite.setCollider("imageSprite", -2,2,55);
  imageSprite.attractionPoint(.9, mouseX, mouseY);
}

function draw() { 
  smooth(4);
  background(255,127,80);   
  
  for (var i = 0; i < count; i++){
  	imageSprite.collide(dumbSprite[i]);
  	dumbSprite[i].collide(imageSprite);

  	for (var g = 0; g < count; g++){
  		dumbSprite[i].collide(dumbSprite[g]);

  	}
  }

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
  //draw all the sprites added to the sketch so far
  //the positions will be updated automatically at every cycle
  drawSprites();
} 


function mousePressed() {
	applyMatrix();

  imageSprite.attractionPoint(.9, mouseX, mouseY);
  dumbSprite[count] = createSprite(random(0,width),random(0,height));
  dumbSprite[count].setCollider("dumbSprite[count]", -2,2,55);
  dumbSprite[count].setSpeed(random(2,3), random(0, 36000));
  dumbSprite[count].addImage(img);
  dumbSprite[count].scale =(random(.01, .1));
  dumbSprite[count].collide(dumbSprite[count]);
  //rotate(random(0, 3));
  dumbSprite[count].rotationSpeed = 0.5;

   count++;
   resetMatrix();
}