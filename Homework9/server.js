var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session)
var mongoose = require('mongoose');
var fs = require('fs');
var jade = require('jade');

var app = express();

app.set('port', 8000);
app.set("views", __dirname + '/views');
app.set("views engine", 'jade');
app.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb://localhost:27017/test', {
	useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: "rhino",
	store: new MongoStore({mongooseConnection: mongoose.connection}),
	cookie: { path:'/', httpOnly: true, secure: false, maxAge: 60 * 60 * 24 * 7}
}));

var routes = require('./router/router')(app);
app.listen(app.get('port'), function(error) {
	if(error) console.log(error);
	else console.log("Running successfully at port " + app.get('port'));
});