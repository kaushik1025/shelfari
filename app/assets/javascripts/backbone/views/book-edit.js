var app = app || {};
$(function($){

  jQuery.fn.serializeObject = function(){  
    var arrayData, objectData;
    arrayData = this.serializeArray();
    objectData = {};

    jQuery.each(arrayData, function() {
      var value;

      if (this.value != null) {
        value = this.value;
      } else {
        value = '';
      }

      if (objectData[this.name] != null) {
        if (!objectData[this.name].push) {
          objectData[this.name] = [objectData[this.name]];
        }

        objectData[this.name].push(value);
      } else {
        objectData[this.name] = value;
      }
    });

    return objectData;
  },

  app.BookEditView = Backbone.View.extend({
    el: '.page',
    template: JST["backbone/templates/edit"],
    events: {
      'submit .edit-book-form': 'savebook'
    },
    savebook: function (ev) {
      var bookDetails = $(ev.currentTarget).serializeObject();
      var book = new app.Book();
      book.save(bookDetails, {
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

