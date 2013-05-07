var app = app || {};
$(function($){

  app.BookEditView = Backbone.View.extend({
    el: '.page',
    template: JST["backbone/templates/edit"],
    events: {
      'submit .edit-book-form': 'savebook'
    },
    savebook: function (ev) {
      console.log("save")
      var title = $('#title').val();
      var author = $('#author').val();
      var status = $('#status').val();
      var book = new app.Book();
      book.save({title: title, author: author, status: status}, {
        success: function (book) {
          console.log("saving...")
          window.location.hash = "";
        }
      });
      return false;
    },
/*    deletebook: function (ev) {
      console.log("Delete");
      var 
      this.book.destroy({
        success: function () {
          window.location.hash = "";
        }
      })
    },*/
    render: function (options) {
      console.log("Edit Render")
      var that = this;
      if(options.id) {
        that.book = new app.Book({id: options.id});
        that.book.fetch({
          success: function (book) {
            console.log("Fetched for Edit for "+options.id);
            that.$el.html(that.template({book: book}));
          }
        })
      } else {
        that.$el.html(that.template({book: null}));
      }
    }
  });


});

