var	app = require('http').createServer(handler),
     io = require('socket.io').listen(app),
     fs = require('fs')
		 url = require('url');

app.listen(1337);
console.log("Listening on port 1337")

function handler (req, res) {
	var pathname = url.parse(req.url).pathname;
	if (pathname == "/") {
		fs.readFile(__dirname + '/static/index.html',
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}
			res.writeHead(200);
			res.end(data);
		});
	}
	else if (pathname == "/js/jquery.js") {
		fs.readFile(__dirname + '/static/js/jquery.js',
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading jquery.js');
			}
			res.writeHead(200);
			res.end(data);
		});
	}
	else if (pathname == "/css/style.css") {
		fs.readFile(__dirname + '/static/css/style.css',
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading style.css');
			}
			res.writeHead(200);
			res.end(data);
		});
	}
	else {
		fs.readFile(__dirname + '/static/404.html',
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading 404.html');
			}
			res.writeHead(200);
			res.end(data);
		});
	}
}

// TODO implement oAuth
io.sockets.on('connection', function (socket) {
	// Once we recieve a chunk of the stream
	socket.on('stream-send', function(stream) {
		// Send it on to the rest of the clients
		stream = fs.createReadStream("polynation.mp3", 
																 {'flags': 'r',
																		'encoding': 'binary', 
																		'mode': 0666, 
																		'bufferSize': 64 * 1024});
		io.sockets.emit('stream-receive', { stream : stream });
	});
});
