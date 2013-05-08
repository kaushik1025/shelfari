var app = app || {};
$(function($){

  app.Router = Backbone.Router.extend({
        routes: {
          "": "home",
          "edit/:id": "edit",
          "new": "edit",
        },

    home: function() {
      var books = new app.Books();
      books.fetch({
        success: function (books) {
          var bookListView = new app.BookListView({collection:books});
          bookListView.render({search: null});
        }
      })     
    },

    edit: function(id){
      var bookEditView = new app.BookEditView();    
      bookEditView.render({id: id});
    },
  });

  new app.Router();
  Backbone.history.start();
});