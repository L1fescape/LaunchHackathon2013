/**
 * Variables
 */
var port = 1337;


/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
	, fs = require('fs')


/**
 * Create and configure express.
 */

var app = express();
app.configure(function(){
  app.set('port', process.env.PORT || port);
  app.set('views', __dirname + '/views');
	app.use(express['static'](__dirname + '/views'));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});


/**
 * Set development mode for debugging.
 */
app.configure('development', function(){
  app.use(express.errorHandler());
});


/**
 * Define our routes.
 */

// Index
app.get('/', routes.index);
// Sample song with chunked responses
app.get('/polynation.mp3', function(request, response) {
	var filename = "public/songs/polynation.mp3";
	fs.readFile(filename, "binary", function(err, file) {
		var header = {};
		if (typeof request.headers.range !== 'undefined') {
			var range = request.headers.range; 
			var parts = range.replace(/bytes=/, "").split("-"); 
			var partialstart = parts[0]; 
			var partialend = parts[1]; 
 
			var total = file.length; 
 
			var start = parseInt(partialstart, 10); 
			var end = partialend ? parseInt(partialend, 10) : total-1;
 
			header["Content-Range"] = "bytes " + start + "-" + end + "/" + (total);
			header["Accept-Ranges"] = "bytes";
			header["Content-Length"]= (end-start)+1;
			header['Transfer-Encoding'] = 'chunked';
			header["Connection"] = "close";
 
			response.writeHead(206, header); 
			response.write(file.slice(start, end)+'0', "binary");
		}
		else{
			response.writeHead(200, header);
			response.write(file, "binary");
		}
		response.end();
	});
});


/** 
 * Initialize listener
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
