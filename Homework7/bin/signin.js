var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');


http.createServer(function (request, response) {
	var params = url.parse(request.url, true).query;
	var user = '';
	var register_h = '';
	var register_c = '';

	fs.readFile(__dirname + "/register.css", function(err, data) {
		register_c = data.toString();
	});
	// fs.readFile(__dirname + "/users.json", 'utf8', function (err, data) {
	// 	// data = JSON.parse(data);
	// 	// if(data[params.username]) {
	// 	// 	//output its detaile
	// 	// }
	// 	// else {
	// 		// response.writeHead(200, {'Content-Type': 'text/html'});
	// 		// response.write(register_h);
	// 		// response.writeHead(200, {'Content-Type': 'text/css'});
	// 		// response.write(register_c);
	// 		// var post = '';
	// 		// request.on('data', function(chunk) {
	// 		// 	post += chunk;
	// 		// });
	// 		// request.on('end', function() {
	// 		// 	post = querystring.parse(post);

	// 		// });
	// 	// }
	// });
	response.on('end', function() {
		fs.readFile(__dirname + "/register.html", function(err, data) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(data.toString());
			response.end();
		});

		
				
	});
}).listen(8000);