var http = require('http');
var fs = require('fs');
var url = require('url');
var events = require('events');
var querystring = require('querystring');
var eventController = new events.EventEmitter();
var dataChange_flag = true;
var userPos = 0;
var allUsers = '';
var theUser = {
	name: '',
	schoolId: '',
	phoneNumber:'',
	email:''
}


http.createServer(function (request, response) {
	var params = url.parse(request.url, true);
	var user = '';
	var pathname = params.pathname;
	var query = params.query;	
	console.log("pathname: " + pathname);
	console.log("queryname:" + query.username);
	console.log("if(pathname != '/')%s", pathname != '/');

		


	var Show_register = function() {
		console.log("Function :Show_register");
		fs.readFile(__dirname + "/register.html", 'utf8', function(err, data) {
			if(err) console.log(err);
			else {
				response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
				response.write(data.toString());
				response.end();
			}
		});
	}

	var Show_detailed = function() {
		console.log("Function :Show_detailed");
		fs.readFile(__dirname + "/detailed.html", function(err, data) {
			response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});		
			response.write(data.toString());
			response.end();
		});
	}
	var handleQuery = function() {
		console.log("Function :handleQuery");
		console.log(allUsers.length);
		var exist_flag = false;		
		if(typeof(query.username) != "undefined") {
			for (var i = allUsers.length - 1; i >= 0; i--) {
				console.log("i: " + allUsers[i].name);
				if(allUsers[i].name == query.username) {
					exist_flag = true;
					theUser.name = allUsers[i].name;
					theUser.schoolId = allUsers[i].schoolId;
					theUser.phoneNumber = allUsers[i].phoneNumber;
					theUser.email = allUsers[i].email;
					break;
				}
			}
			if(exist_flag) {
				Show_detailed();
			}
			else {
				console.log("handleQuery Show_register");
				Show_register();
				// return true;
			}
			return true;
		}
		return false;
	}


	var GETmethod = function() {
		console.log("Function :GETmethod");
		if(pathname != '/') {
			console.log("i am here");
			if(/(css|js)$/.test(pathname)){
				console.log("here");
				fs.readFile(pathname.substr(1), function(err ,data) {
					console.log(pathname.match(/(css|js)$/));
					response.writeHead(200, {'Content-Type': 'text/' + pathname.match(/(css|js)$/)});
					response.write(data.toString());
					response.end();
				});
			}
			else if(/json/.test(pathname)) {
				response.writeHead(200, {'Content-Type': 'charset=utf-8'});
				response.end(JSON.stringify(theUser));	
			}
			else {
				console.log("GETmethod Show_register");
				Show_register();
			}
			return true;
		}
		else return false;

		// else return false;
		// return true;				
	}
	var start = function() {
		console.log("Function :getAllusers");
		fs.readFile(__dirname + "/users.json", 'utf8', function (err, data) {
			if(err) {
				console.log(err);
			}
		allUsers = JSON.parse(data);
		var post = '';
		var valid_flag = true;
		request.on('data', function(chunk) {
			post += chunk;
		});
		request.on('end', function() {
			console.log("on data end");
			post = querystring.parse(post);
			if(post.name && post.schoolId && post.phoneNumber && post.email) {
				console.log("Has post request");
				for (var i = allUsers.length - 1; i >= 0; i--) {
					if(allUsers[i].name == post.name ||
						 allUsers[i].schoolId == post.schoolId ||
						 allUsers[i].phoneNumber == post.phoneNumber ||
						 allUsers[i].email == post.email){
						valid_flag == false;
						break;
					}
				}
				if(valid_flag) {
					theUser.name = post.name;
					theUser.schoolId = post.schoolId;
					theUser.phoneNumber = post.phoneNumber;
					theUser.email = post.email;
					allUsers.push(theUser);
					fs.writeFile(__dirname + "/users.json", JSON.stringify(allUsers), function(err) {
						if(err) console.log(err);
					});
					Show_detailed();
					// return true;
				}
				else {
					console.log("POSTmethod Show_register");
					Show_register();
					// 
				}
			}
			else {
				if(handleQuery()) return;
				if(GETmethod()) return;
				if(pathname == '/' && typeof(query.username) == "undefined") {
					console.log("Nothing happends");
					Show_register();
				}								
			}
		});			
		});		

	}
	
	start();

}).listen(8000);