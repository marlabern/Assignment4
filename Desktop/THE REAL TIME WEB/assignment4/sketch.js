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

var pinkcircle;
var bluecircle;

var pinkcircleX;
var pinkcircleY;

var bluecircleX;
var bluecircleY;

var blueScore=0;
var pinkScore=0;


function setup() {
	createCanvas(600,600);

	// x1= random(width-25);
	// y1= random(height-150);

	x1= 130;
	y1= 40;

	x2= 430;
	y2= 40;

	// for (var i=0; i<1; i++) {
    // bluecircle.push(new BlueCircle());
  	// }
  	bluecircle = new BlueCircle(400, 450);
  	
  	// for (var i=0; i<1; i++) {
    // pinkcircle.push(new PinkCircle());
  	// }

  	pinkcircle = new PinkCircle(150, 450);
}

function draw() {

	background("whitesmoke");
	
	fill(25, 100, 255);
	text("Blue Score: "+ blueScore, 100,5,100,100);
	fill(255, 0, 150);
	text("Pink Score: "+ pinkScore, 400,5,100,100);

	// for (var i=0; i<pinkcircle.length; i++) {
 //    pinkcircle[i].display();
 //  	}

 	pinkcircle.display();
  	// for (var i=0; i<bluecircle.length; i++) {
    bluecircle.display();
  	// }
	

	if(isDragging1){
		x1= mouseX;
		y1=mouseY;
	}

	if(isDragging2){
		x2= mouseX;
		y2=mouseY;
	}
	
	firstEllipse(x1, y1);
	secondEllipse(x2, y2);

	sendBlueSolid({
		"x1": x1,
		"y1": y1
	});

	sendPinkSolid({
		"x2": x2,
		"y2": y2
	});

	// sendBlueRing({
	// 	"bluecircleX": bluecircleX,
	// 	"bluecircleY": bluecircleY
	// });

	// sendPinkRing({
	// 	"pinkcircleX": pinkcircleX,
	// 	"pinkcircleY": pinkcircleY
	// });

}

function sendBlueSolid(message){
	socket.emit("bluesolid", message);
}

function sendPinkSolid(message){
	socket.emit("pinksolid", message);
}
// function sendPinkRing(message){
// 	socket.emit("pinkring", message);
// }
// function sendBlueRing(message){
// 	socket.emit("bluering", message);
// }


function firstEllipse(theX, theY){
		noStroke();
		fill(25, 100, 255);
		ellipse(theX,theY, r1*2, r1*2);
}

function secondEllipse(theX, theY){
	noStroke();
	fill(255, 0, 150);
	ellipse(theX,theY, r2*2, r2*2);
}

function BlueCircle(startingX, startingY) {

	this.x = startingX;
	this.y = startingY;

  // bluecircleX = random(width-100);
  // bluecircleY = random(height-100);
 

  this.display = function() {
  	fill(255);
  	stroke(25, 100, 255); 
  	strokeWeight(3);
    ellipse(this.x, this.y, 50, 50);
  }
  this.check= function(){
  	if(x1 > (this.x- 25) && x1 <(this.x+25) 
			&& y1 > (this.y- 25) && y1 <(this.y +25)){
  		// console.log("blue circle worked.")
  		return true;
  	}
  	return false;
	}
}

function PinkCircle(startingX, startingY) {
  // pinkcircleX = random(width-100);
  // pinkcircleY = random(height-100);
  this.x = startingX;
  this.y = startingY;

  this.display = function() {
  	fill(255);
  	stroke(255, 0, 150);
  	strokeWeight(3);
    ellipse(this.x, this.y, 50, 50);
  }
   this.check= function(){
  	if(x2 > (this.x- 25) && x2 <(this.x+25) 
			&& y2 > (this.y- 25) && y2 <(this.y +25)){
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

	//if blue hole was dropped into
	if(bluecircle.check()){

		//increase blue score
		blueScore++;
		console.log("blue score: " + blueScore);
		//probably send the score to the server here also

		//generate a new x and y position for the blue hole
		bluecircle.x = floor(random(width-100)); //use floor to get a nicer number
		bluecircle.y = floor(random(height-100));
		
		//send the updated location to the server
		sendBlueHole({'x': bluecircle.x, 'y': bluecircle.y});
	}

	// for(var i=0; i<bluecircle.length; i++){
	// 	if (bluecircle[i].check()){
	// 		blueScore++;
	// 		console.log(blueScore);
	// 		bluecircle.splice(i,1);
	// 		bluecircle.push(new BlueCircle());
	// 	}
	// }
	// for(var i=0; i<pinkcircle.length; i++){
	// 	if (pinkcircle[i].check()){
	// 		pinkScore++;
	// 		console.log(pinkScore);
	// 		pinkcircle.splice(i,1);
	// 		pinkcircle.push(new PinkCircle());
	// 	}
	// }

	//if pink hole was dropped into
	if(pinkcircle.check()){

		//increase pink score
		pinkScore++;
		console.log("pink score: " + blueScore);
		//probably send the score to the server here also

		//generate a new x and y position for the pink hole
		pinkcircle.x = floor(random(width-100)); //use floor to get a nicer number
		pinkcircle.y = floor(random(height-100));
		
		//send the updated location to the server
		sendPinkHole({'x': pinkcircle.x, 'y': pinkcircle.y});
	}
}

function sendBlueHole(message){
	socket.emit('bluehole', message);

	//maybe also emit the score here
	socket.emit('blueScore', message)
}
function sendPinkHole(message){
	socket.emit('pinkhole', message);

	//maybe also emit the score here
	socket.emit('pinkScore', message)
}















