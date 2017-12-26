var querystring = require('querystring');
exports.addUser = function(req, res, post) {
  var sess = req.session;
  var userflag = false;
  var valid_flag = true;
  var users = sess.users;
  var errMsg = {
      nameRE: "",
      passWordRE: "",
      schoolIdRE: "",
      phoneNumberRE: "",
      emailRE: ""
  }
  post = querystring.parse(post);
  for (var i = users.length - 1; i >= 0; i--) {
      if (users[i].name == post.name ||
          users[i].schoolId == post.schoolId ||
          users[i].phoneNumber == post.phoneNumber ||
          users[i].email == post.email) {
          if (users[i].name == post.name) errMsg.nameRE = "用户名重复，请重新输入！";
          if (users[i].schoolId == post.schoolId) errMsg.schoolIdRE = "学号重复，请重新输入！";
          if (users[i].phoneNumber == post.phoneNumber) errMsg.phoneNumberRE = "您的手机号码已被注册！";
          if (users[i].email == post.email) errMsg.emailRE = "您的邮箱已被注册！";
          valid_flag = false;
      }
  }
  if (!valid_flag) {
      res.render('regist.jade', errMsg);
      res.end();
  } else {
      post.signin = true;
      users.push(post);
      sess.isSignIn = true;
      res.redirect('/detaile');
  }
}

exports.getUser = function(req, res) {
  var sess = req.session;
  if (sess.isSignIn) {
      for (var i = 0; i < sess.users.length; i++) {
          if (sess.users[i].signin) {
              res.render('detaile.jade', sess.users[i]);
              res.end();
              break;
          }
      }
  } else {
      res.redirect('/signin');
  }	
}
