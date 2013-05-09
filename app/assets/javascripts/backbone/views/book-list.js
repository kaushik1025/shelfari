var app = app || {};
$(function($){

  app.BookListView = Backbone.View.extend({
    el: '.page',
    template: JST["backbone/templates/list"],
    events: {
      'click .search': 'searchbooks',
      'click .all': 'getallbooks'
    },

    initialize: function(){
        this.collection.on("add", this.render, this);
        this.collection.on("remove", this.render, this);
        this.collection.on("reset", this.render, this);
    },

    getallbooks: function(){
      var router = new app.Router;
      router.home();
    },

    searchbooks: function(){
      var searchstring = $("#searchinput").val();
      var searchresults = Backbone.Collection.extend();
      searchresults = this.options.collection.search(searchstring);
      this.render({search: searchresults});
    },    

    render: function (options) {
      console.log("List Render");
      if(options.search){
        console.log(JSON.stringify(options.search))
        this.$el.html(this.template({books: options.search}))                
      }
      else{
        this.$el.html(this.template({books: this.options.collection.models}));
      }
    }
  });

});