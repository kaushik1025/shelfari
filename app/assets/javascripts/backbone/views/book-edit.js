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
      'submit .edit-book-form': 'savebook',
      'click .delete': 'deletebook'
    },

    initialize: function() {
        _.bindAll(this, 'cleanup');
    },

    cleanup: function() {
      console.log("Edit Cleanup");
        this.undelegateEvents();
        $(this.el).empty();
    },    

    savebook: function (ev) {
        var bookDetails = $(ev.currentTarget).serializeObject();
        var book = new app.Book();
        console.log("to save = "+JSON.stringify(bookDetails))
        book.save(bookDetails, {
          success: function (book) {
            var router = new app.Router;
            router.navigate('home', {trigger:true});
        }
      });
      return false;
    },

    deletebook: function (ev) {
      ev.preventDefault();
      var book = new app.Book({id: $("#id").val()});
      book.fetch({
          success: function (book) {
            console.log("fetched for delete = "+book)
            book.destroy({
              success: function(){
                console.log('destroyed');
                var router = new app.Router;
                router.navigate('home', {trigger:true});
              }
            });    
          }
      })
    },

    render: function (options) {
      console.log("Edit Render"+sessionStorage.getItem('rendered'));
      var that = this;
      if(sessionStorage.getItem('rendered')=='true')
        this.cleanup();
      else
        sessionStorage.setItem('rendered','true');

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

