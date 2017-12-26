
var controller = require('../controller/controller');

module.exports = function(app) {
	app.get('/',controller.root);
	app.get('/detaile', controller.getDetaile);
	app.get('/signin', controller.getSignin);
	app.post('/signin', controller.postSignin);
	app.get('/regist', controller.getRegist);
	app.post('/regist', controller.postRegist);
	app.get('/out', controller.quit);
	app.get('*', controller.root);
};