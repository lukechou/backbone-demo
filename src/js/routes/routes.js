/*
 * app routes
 * */
var workSpace = Backbone.Router.extend({
	routes: {
		'login': 'login',
		'register': 'register',
		'': 'index',
		'content/:username': 'content'
	},
	login: function(){
		var login_view = new loginView({model:new userModel()});
		login_view.render();
	},
	register: function(){
		var register_view = new registerView();
		register_view.render();
	},
	index: function(){
		var index_view = new indexView();
		index_view.render();
	},
	content: function(username){
		var content_view = new contentView();
		content_view.render(username);
	}
});