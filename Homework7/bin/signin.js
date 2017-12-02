var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

http.createServer(function (request, response) {
	var flag = false, pos = 0;
	var params = url.parse(request.url, true);
	var user = '';
	var register_h = '';
	var register_c = '';
	// console.log(params);
	var pathname = params.pathname;
	var query = params.query;
	var theUser = {
		"name": undefined,
		"schoolId": undefined,
		"phoneNumber":undefined,
		"email":undefined
		// "name":"aRhino",
		// "schoolId":"16340076",
		// "phoneNumber":"17620181219",
		// "email":"xx@qq.com"		
	}
	console.log(pathname);
	if(/(css|js)$/.test(pathname)){
		fs.readFile(pathname.substr(1), function(err ,data) {
			console.log(pathname.match(/(css|js)$/));
			response.writeHead(200, {'Content-Type': 'text/' + pathname.match(/(css|js)$/)});
			response.write(data.toString());
			response.end();
		});
	}
	else if(/json/.test(pathname)) {
		// fs.readFile(pathname.substr(1), function(err ,data) {
		// 	console.log("000");
		// 	response.writeHead(200, {'Content-Type': 'charset=utf-8'});
		// 	response.end(data);
		// });	
		response.writeHead(200, {'Content-Type': 'charset=utf-8'});
		response.end(JSON.stringify(theUser));	
	}


	else {
	if(typeof(query.username) != "undefined") {
		fs.readFile(__dirname + "/users.json", 'utf8', function (err, data) {
			if(err) {
				console.log(err);
			}
			data = JSON.parse(data);
			for (var i = data.length - 1; i >= 0; i--) {
				if(data[i].name == query.username) {
					flag = true;
					pos = i;
					break;
				}
			}
			if(flag) {
				// console.log("Find the user");
				fs.readFile(__dirname + "/detailed.html", function(err, data) {
					response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});		
					response.write(data.toString());
					response.end();
				});

			}	
			else{
				// console.log("No such user");
				response.end();
			}
		});
	}
	else {
		response.end();
	}
}



}).listen(8000);