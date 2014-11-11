var loginView = Backbone.View.extend({
	el: '.container',
	render: function(){
		$(this.el).load('../html/partial/login.html');
	},
	events: {
		'click #x-submit': 'sub'
	},
	sub: function(){
		this.model.set({
			username:$('#username').val(),
			password: $('#password').val()
		});
		window.location.href = tool.urlFilter('content/:' + this.model.get('username'));
	}
});
var registerView = Backbone.View.extend({
	el: '.container',
	render: function(){
		$(this.el).load('../html/partial/register.html');
	}
});
var indexView = Backbone.View.extend({
	el: '.container',
	render: function(){
		$(this.el).load('../html/partial/home.html');
	}
});
var picView = Backbone.View.extend({
	el: '.container',
	useModel: function(){
		return this.model;
	},
	render: function(){
		$(this.el).load('../html/partial/pic.html');
	}
});
var contentView = Backbone.View.extend({
	el: '.container',
	render: function(username){
		var deffered = $.Deferred();
		deffered.done(function(){
			$('.userInfo').html(_.template($('#t-pic1').html())({username: tool.poundFilter(username)}));
		});
		$(this.el).load('../html/partial/pic.html',function(){
			deffered.resolve();
		});
	}
});
