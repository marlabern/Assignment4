// HTTP PORTION

var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			res.writeHead(200);
			res.end(data);
  		}
  	);
  	
}


// WEBSOCKET PORTION

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', 

	function (socket) {
	
		console.log("We have a new client: " + socket.id);
		
		///MY SOCKET EVENTS HERE

		socket.on("bluesolid", function(data){
			console.log("blue solid: " + data.x1 + "," + data.y1);
			socket.broadcast.emit("bluesolid", data);
		});

		socket.on("pinksolid", function(data){
			console.log("pink solid: " + data.x2 + "," + data.y2);
			socket.broadcast.emit("pinksolid", data);
		});
		// socket.on("bluering", function(data){
		// 	// console.log("pink ring: " + data.x2 + "," + data.y2);
		// 	socket.broadcast.emit("bluering", data);
		// });
		// socket.on("pinkring", function(data){
		// 	// console.log("pink solid: " + data.x2 + "," + data.y2);
		// 	socket.broadcast.emit("pinkring", data);
		// });
		
		//blue hole moved
		socket.on('bluehole', function(data){
			console.log(data.x + ", " + data.y);

			socket.broadcast.emit('bluehole', data);
		});

		socket.on('pinkhole', function(data){
			console.log(data.x + ", " + data.y);

			socket.broadcast.emit('pinkhole', data);
		});

		socket.on('blueScore', function(data){
			socket.broadcast.emit('blueScore', data);
		});

		socket.on('pinkScore', function(data){

			socket.broadcast.emit('pinkScore', data);
		});

		socket.on("start", function(){
			io.sockets.emit("start");
		});
		
		
		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);
