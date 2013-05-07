var app = app || {};
$(function($){

	app.Book = Backbone.Model.extend({
	  urlRoot: '/books'
	});

});