var app = app || {};
$(function($){

  app.BookListView = Backbone.View.extend({
    el: '.page',
    template: JST["backbone/templates/list"],
    events: {
      'click .search': 'searchbooks',
    },

    initialize: function(){
        this.collection.on("add", this.render, this);
        this.collection.on("remove", this.render, this);
        this.collection.on("reset", this.render, this);
    },

    searchbooks: function(ev){
      ev.preventDefault();
      var searchstring = $("#searchinput").val();
      var searchresults = Backbone.Collection.extend();
      var router = new app.Router;
      router.navigate('search/'+searchstring, {trigger:true});      
    },    

    render: function (options) {
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