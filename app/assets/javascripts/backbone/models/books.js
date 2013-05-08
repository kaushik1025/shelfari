var app = app || {};
$(function($){

	app.Books = Backbone.Collection.extend({
	  url: '/books',
	  model: app.Book,
	
	    search : function(letters){
	      if(letters == "") return this;
	   
	      var pattern = new RegExp(letters,"gi");
	      return _.filter(this.models, function(model) {
      		return pattern.test(model.get("title"));
    		});
	    }	  
	});

});