var app = app || {};
$(function($){

  app.BookListView = Backbone.View.extend({
    el: '.page',
    template: JST["backbone/templates/list"],
    events: {
      'click .delete': 'deletebook'
    },
    deletebook: function(){
      alert($(this).data("id"));
    },

    render: function () {
      this.$el.html(this.template({books:this.options.collection.models}))
    }
  });

});