'use strict';

module.exports = function(app) {
	
	var userHandlers = require('../controllers/userController.js');

	// todoList Routes
	app.route('/profile')
		.post(userHandlers.loginRequired, userHandlers.profile);

	app.route('/contact')
		.get(userHandlers.loginRequired, userHandlers.contacts);

	app.route('/contact/add')
		.post(userHandlers.loginRequired, userHandlers.addContact);

	app.route('/contact/put')
		.put(userHandlers.loginRequired, userHandlers.profile);

	app.route('/contact/delete')
		.delete(userHandlers.loginRequired, userHandlers.deleteContact);

	app.route('/auth/register')
		.post(userHandlers.register);

	app.route('/auth/sign_in')
		.post(userHandlers.sign_in);
};