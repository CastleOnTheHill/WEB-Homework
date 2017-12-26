var querystring = require('querystring');
var url = require('url');
var models = require('../models/models')
	exports.root = function(req, res) {
    var sess = req.session;
    var params = url.parse(req.url, true);
    var query = params.query;
    if (sess.isSignIn) {
        if (typeof(query.username) != "undefined") {
            for (var i = 0; i < sess.users.length; i++) {
                if (sess.users[i].signin) {
                    if (sess.users[i].name == query.username)
                        res.redirect('/detaile');
                    else res.render('detaile.jade', {
                        name: sess.users[i].name,
                        schoolId: sess.users[i].schoolId,
                        phoneNumber: sess.users[i].phoneNumber,
                        email: sess.users[i].email,
                        msg: "只能够访问自己的数据"
                    });
                }
            }
        } else res.redirect('/detaile');
    } else {
        res.redirect('/signin');
    }
}

exports.getSignin = function(req, res) {
    var sess = req.session;
    if (sess.isSignIn) res.redirect('/detaile');
    else res.render('signin.jade', { msg: "" });
}

exports.postSignin = function(req, res) {
    var sess = req.session;
    var userflag = false;
    if (!sess.users) sess.users = [];
    var users = sess.users;
    var post = '';
    req.on('data', function(chunk) {
        post += chunk;
    });
    req.on('end', function() {
        post = querystring.parse(post);
        for (var i = 0; i < users.length; i++) {
            if (users[i].name == post.name) {
                userflag = true;
                if (post.passWord === users[i].passWord) {
                    sess.isSignIn = true;
                    users[i].signin = true;
                    res.redirect('/detaile');
                    break;
                } else {
                    res.render('signin.jade', { msg: "worng password!" });
                }
            }
        }
        if (!userflag) res.render('signin.jade', { msg: "No such user!" });
    });
}

exports.getRegist = function(req, res) {
    if(req.session.isSignIn)
        res.redirect('detaile');
    else
        res.render('regist.jade');
}

exports.postRegist = function(req, res) {
    var sess = req.session;
    if (!sess.users) sess.users = [];
    var post = '';
    req.on('data', function(chunk) {
        post += chunk;
    });
    req.on('end', function() {
    	models.addUser(req, res, post);
    });
}

exports.getDetaile = function(req, res) {
    models.getUser(req, res);
};

exports.quit = function(req, res) {
  var sess = req.session;
  sess.isSignIn = false;
  for (var i = 0; i < sess.users.length; i++) {
      sess.users[i].signin = false;
  }
  res.redirect('/');
}