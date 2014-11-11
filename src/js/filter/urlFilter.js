/*
 * filter
 * */
(function(w,$){
	var Tool = {
		urlFilter: function(url){
			var browserUrl = window.location.href,urlArr = browserUrl.split('#');
			if(urlArr.length <=2){
				urlArr[1] = url;
				return  urlArr.join('#');
			}
		},
		poundFilter: function(param){
			return param.substr(1);
		}
	};
	w.tool = Tool;
})(window,jQuery);