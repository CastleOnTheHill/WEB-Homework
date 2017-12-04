var http = require('http');
var fs = require('fs');
var url = require('url');
var events = require('events');
var querystring = require('querystring');
var path = require('path');
var eventController = new events.EventEmitter();
var dataChange_flag = true;
var userPos = 0;
var allUsers = '';
var theUser = {
    name: '',
    schoolId: '',
    phoneNumber: '',
    email: ''
}

var errMsg = {
    nameRE: false,
    schoolIdRE: false,
    phoneNumberRE: false,
    emailRE: false
}


http.createServer(function(request, response) {

    var params = url.parse(request.url, true);
    var pathname = params.pathname;
    var query = params.query;
    console.log("pathname: " + pathname);
    var Show_register = function() {
        console.log("Function :Show_register");
        fs.readFile(__dirname + "/../lib/register.html", 'utf8', function(err, data) {
            if (err) console.log(err);
            else {
                response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                response.write(data.toString());
                response.end();
            }
        });
    }

    var Show_detailed = function() {
        console.log("Function :Show_detailed");
        fs.readFile(__dirname + "/../lib/detailed.html", function(err, data) {
            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            response.write(data.toString());
            response.end();
        });
    }
    var handleQuery = function() {
        console.log("Function :handleQuery");
        var exist_flag = false;
        if (typeof(query.username) != "undefined") {
            for (var i = allUsers.length - 1; i >= 0; i--) {
                if (allUsers[i].name == query.username) {
                    exist_flag = true;
                    theUser.name = allUsers[i].name;
                    theUser.schoolId = allUsers[i].schoolId;
                    theUser.phoneNumber = allUsers[i].phoneNumber;
                    theUser.email = allUsers[i].email;
                    break;
                }
            }
            if (exist_flag) {
                Show_detailed();
            } else {
                console.log("handleQuery Show_register");
                Show_register();
            }
            return true;
        }
        return false;
    }


    var GETmethod = function() {
        console.log("Function :GETmethod");
        if (pathname != '/') {
            fs.readFile(__dirname + "/../lib/" + pathname.substr(1), function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(pathname);
                    console.log(pathname.substr(pathname.lastIndexOf('.') + 1));
                    if (/json/.test(pathname)) {
                        response.writeHead(200, { 'Content-Type': 'charset=utf-8' });
                        if (/err/.test(pathname)) {
                            response.end(JSON.stringify(errMsg));
                            errMsg.nameRE = false;
                            errMsg.schoolIdRE = false;
                            errMsg.phoneNumberRE = false;
                            errMsg.emailRE = false;
                        } else
                            console.log(theUser);
                        response.end(JSON.stringify(theUser));
                    } else {
                        response.writeHead(200, { 'Content-Type': 'text/' + pathname.substr(pathname.lastIndexOf('.') + 1) });
                        response.write(data);
                        response.end();
                    }
                }
            });
            return true;
        } else return false;
    }

    var start = function() {
        console.log("Function :getAllusers");
        fs.readFile(__dirname + "/../lib/users.json", 'utf8', function(err, data) {
            if (err) {
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
                if (post.name && post.schoolId && post.phoneNumber && post.email) {
                    console.log("Has post request");
                    for (var i = allUsers.length - 1; i >= 0; i--) {
                        if (allUsers[i].name == post.name ||
                            allUsers[i].schoolId == post.schoolId ||
                            allUsers[i].phoneNumber == post.phoneNumber ||
                            allUsers[i].email == post.email) {
                            if (allUsers[i].name == post.name) errMsg.nameRE = true;
                            if (allUsers[i].schoolId == post.schoolId) errMsg.schoolIdRE = true;
                            if (allUsers[i].phoneNumber == post.phoneNumber) errMsg.phoneNumberRE = true;
                            if (allUsers[i].email == post.email) errMsg.emailRE = true;
                            valid_flag = false;
                            break;
                        }
                    }
                    if (valid_flag) {
                        theUser.name = post.name;
                        theUser.schoolId = post.schoolId;
                        theUser.phoneNumber = post.phoneNumber;
                        theUser.email = post.email;
                        allUsers.push(theUser);
                        fs.writeFile(__dirname + "/../lib/users.json", JSON.stringify(allUsers), function(err) {
                            if (err) console.log(err);
                        });
                        Show_detailed();
                    } else {
                        Show_register();
                    }
                } else {
                    if (handleQuery()) return;
                    if (GETmethod()) return;
                    if (pathname == '/' && typeof(query.username) == "undefined") {
                        console.log("Nothing happends");
                        Show_register();
                    }
                }
            });
        });

    }

    start();

}).listen(8000);