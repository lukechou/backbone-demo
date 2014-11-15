app.AppView = Backbone.View.extend({
	el: '#todoapp',
	statsTemplate: _.template($('#stats-template').html()),
	initialize: function(){
		//Mark all as complete的checkbox
		this.allCheckbox = this.$('#toggle-all')[0]; 
		//手动输入框
		this.$input = this.$('#new-todo');
		//底部信息栏
		this.$footer = this.$('#footer');
		//main内容
		this.$main = this.$('#main');
		//监听Todos的变化
		this.listenTo(app.Todos,'add',this.addOne);
		this.listenTo(app.Todos,'reset',this.addAll);
		this.listenTo(app.Todos,'change:completed',this.filterOne);
		this.listenTo(app.Todos,'filter',this.filterAll);
		//最终所有Todos的变化，都将触发重新渲染
		this.listenTo(app.Todos,'all',this.render);
		//获取信息
		app.Todos.fetch();
	},
	render: function(){
		//已经完成的数量
		var completed = app.Todos.completed().length;
		//未完成的数量
		var remaining = app.Todos.remaining().length;
		if(app.Todos.length){
			this.$main.show();
			this.$footer.show();
			this.$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));
			this.$('#filter li a').removeClass('selected').filter('[href="#/' + (app.TodoFilter || '') + '"]').addClass('selected');
		}else{
			this.$main.hide();
			this.$footer.hide();
		}
		this.allCheckbox.checked = !remaining;
	},
	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'
	},
	//每次手动添加model到collection中时都会触发addOne方法
	addOne: function(todo){
		//生成的model传入TodoView视图中去生成代码片段，插入dom中，这里为何要做两个view，也是为了方便复用
		var view = new app.TodoView({
			model: todo
		});
		$('#todo-list').append(view.render().el);
	},
	//一旦reset触发后,清空内容，调用addOne重新渲染导入。类似重置
	addAll: function(){
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne,this);
	},
	//将completed的值设反
	filterOne: function(todo){
		todo.trigger('visible');
	},
	//将Todos里的所有内容重新置换一遍
	filterAll: function(){
		app.Todos.each(this.filterOne,this);
	},
	newAttributes: function(){
		return {
			title: this.$input.val().trim(),
			order: app.Todos.nextOrder(),
			completed: false
		};
	},
	//手动输入input的相应事件
	createOnEnter: function(event){
		if(event.which !== ENTER_KEY || !this.$input.val().trim()){
			return ;
		}
		app.Todos.create(this.newAttributes());
		this.$input.val('');
	},
	clearCompleted: function(){
		_.invoke(app.Todos.completed(),'destroy');
		return false;
	},
	toggleAllComplete: function(){
		var completed = this.allCheckbox.checked;
		app.Todos.each(function(todo){
			todo.save({
				'completed': completed
			});
		});
	}
});