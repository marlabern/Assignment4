//declare variables to hold ellipse x and y positions
var x1;
var y1;
var r1= 15;

var x2;
var y2;
var r2= 15;

var isDragging1= false;
var isDragging2= false;

var score1=0;
var score2=0;

var pinkcircle=[];
var bluecircle=[];

var pinkcircleX;
var pinkcircleY;

var bluecircleX;
var bluecircleY;

var blueScore=0;
var pinkScore=0;


function setup() {
	createCanvas(600,600);

	x1= random(width-25);
	y1= random(height-150);

	x2= random(width-25);
	y2= random(height-150);

	for (var i=0; i<1; i++) {
    bluecircle.push(new BlueCircle());
  	}
  	for (var i=0; i<1; i++) {
    pinkcircle.push(new PinkCircle());
  	}
}

function draw() {

	background("whitesmoke");
	
	fill(25, 100, 255);
	text("Blue Score: "+ blueScore, 100,5,100,100);
	fill(255, 0, 150);
	text("Pink Score: "+ pinkScore, 400,5,100,100);

	for (var i=0; i<pinkcircle.length; i++) {
    pinkcircle[i].display();
  	}
  	for (var i=0; i<bluecircle.length; i++) {
    bluecircle[i].display();
  	}
	

	if(isDragging1){
		x1= mouseX;
		y1=mouseY;
	}

	if(isDragging2){
		x2= mouseX;
		y2=mouseY;
	}
	
	firstEllipse();
	secondEllipse();

}
function firstEllipse(){
		noStroke();
		fill(25, 100, 255);
		ellipse(x1,y1, r1*2, r1*2);
}

function secondEllipse(){
	noStroke();
	fill(255, 0, 150);
	ellipse(x2,y2, r2*2, r2*2);
}
function BlueCircle() {

  bluecircleX = random(width-100);
  bluecircleY = random(height-100);
 

  this.display = function() {
  	fill(255);
  	stroke(25, 100, 255); 
  	strokeWeight(3);
    ellipse(bluecircleX, bluecircleY, 50, 50);
  }
  this.check= function(){
  	if(x1 > (bluecircleX- 25) && x1 <(bluecircleX+25) 
			&& y1 > (bluecircleY- 25) && y1 <(bluecircleY +25)){
  		// console.log("blue circle worked.")
  		return true;
  	}
  	return false;
	}
}

function PinkCircle() {
  pinkcircleX = random(width-100);
  pinkcircleY = random(height-100);

  this.display = function() {
  	fill(255);
  	stroke(255, 0, 150);
  	strokeWeight(3);
    ellipse(pinkcircleX, pinkcircleY, 50, 50);
  }
   this.check= function(){
  	if(x2 > (pinkcircleX- 25) && x2 <(pinkcircleX+25) 
			&& y2 > (pinkcircleY- 25) && y2 <(pinkcircleY +25)){
  		// console.log("pink circle worked.")
  		return true;
  	}
  	return false;
  }
}


function mousePressed(){
	if(dist(x1,y1,mouseX, mouseY)< r1/2){
		isDragging1 = true;
	}
	if(dist(x2,y2,mouseX, mouseY)< r2/2){
		isDragging2 = true;
	}
}

function mouseReleased(){
	isDragging1 = false;
	isDragging2 = false;

	for(var i=0; i<bluecircle.length; i++){
		if (bluecircle[i].check()){
			blueScore++;
			console.log(blueScore);
			bluecircle.splice(i,1);
			bluecircle.push(new BlueCircle());
		}
	}
	for(var i=0; i<pinkcircle.length; i++){
		if (pinkcircle[i].check()){
			pinkScore++;
			console.log(pinkScore);
			pinkcircle.splice(i,1);
			pinkcircle.push(new PinkCircle());
		}
	}
}

