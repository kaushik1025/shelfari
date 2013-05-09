var app = app || {};
$(function($){

  app.Router = Backbone.Router.extend({
        routes: {
          "": "home",
          "home": "home",
          "search/:searchstring": "search",
          "edit/:id": "edit",
          "new": "edit",
        },

    home: function() {
      console.log("home route")
      var books = new app.Books();
      books.fetch({
        success: function (books) {
          var bookListView = new app.BookListView({collection:books});
          bookListView.render({search: null});
        }
      })     
    },

    search: function(searchstring) {
      console.log("search route")
      var books = new app.Books();
      books.fetch({
        success: function (books) {
          searchresults = books.search(searchstring);
          var bookListView = new app.BookListView({collection:books});
          bookListView.render({search: searchresults});
        }
      })     
    },    

    edit: function(id){
      var bookEditView = new app.BookEditView();         
      bookEditView.render({id: id});
    },
  });

  sessionStorage.setItem('rendered',false);
  new app.Router();
  Backbone.history.start();
});