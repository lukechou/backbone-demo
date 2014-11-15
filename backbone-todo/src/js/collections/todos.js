var TodoList = Backbone.Collection.extend({
	model: app.Todo,
	localStorage: new Backbone.LocalStorage('todos-backbone'),
	//返回completed为true的集合
	completed: function(){
		//获取completed为true的model集合
		return this.filter(function(todo){
			return todo.get('completed')
		});
	},
	//返回completed为false的集合
	remaining: function(){
		return this.without.apply(this,this.completed);
	},
	nextOrder: function(){
		if(!this.length){
			return 1;
		}
		return this.last().get('order') + 1;
	},
	//获取某个model的order属性
	comparator: function(todo){
		return todo.get('order');
	}
});
app.Todos = new TodoList();