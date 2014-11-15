app.TodoView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#item-template').html()),
	events: {
		'click label': 'edit',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},
	initialize: function(){
		//如果model对象属性发生改变，则触发该渲染
		this.listenTo(this.model,'change',this.render);
	},
	render: function(){
		//该渲染是管理每一条model信息的
		this.$el.html(this.template(this.model.toJSON()));
		this.$input = this.$('.edit');
		return this;
	},
	//点击label的时候触发让input获得焦点
	edit: function(){
		this.$el.addClass('editing');
		this.$input.focus();
	},
	//如果是回车键，或者是input失去焦点，则调用close方法。
	close: function(){
		var value = this.$input.val().trim();
		if(value){
			//保存model修改的属性
			this.model.save({
				title: value
			});
		}
		this.$el.removeClass('editing');
	},
	//输入的时候触发
	updateOnEnter: function(e){
		if(e.which === ENTER_KEY){
			this.close();
		}
	}
});