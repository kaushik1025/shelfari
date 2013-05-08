var app = app || {};
$(function($){

  app.BookListView = Backbone.View.extend({
    el: '.page',
    template: JST["backbone/templates/list"],
    events: {
      'click .delete': 'deletebook',
      'click .search': 'searchbooks'
    },

    initialize: function(){
      this.options.collection.on('remove', this.render, this);  
    },

    searchbooks: function(){
      var searchstring = $("#searchinput").val();
      var searchresults = Backbone.Collection.extend();
      searchresults = this.options.collection.search(searchstring);
      this.render({search: searchresults});
    },    

    deletebook: function(e){
      var model = this.options.collection.get($(e.currentTarget).data("id"));
      model.destroy();
      this.options.collection.remove(model);
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