var app = app || {};
$(function($){

	app.Books = Backbone.Collection.extend({
	  url: '/books',
	  model: app.Book
	});

});