var AppView = Backbone.View.extend({

  attributes: {
    id: "app",
    class: "row"
  },

  dollItemsTemplate: _.template('<div>JACKET</div>'),

  initialize: function () {

    this.dollView = new DollView({
      model: new DollModel({baseSrc: '_default_man.png'})
    });

    this.$toolbox = $('<div class="col-md-6" id="toolbox"><ul></ul></div>');

    for (var collectionName in this.model.get('collections')){
      console.log("colname: ", collectionName);
      this.$toolbox.children('ul').append('<li>'+collectionName+'</li>');
    }


    this.render();
  },

  render: function () {
    return this.$el.html([
      this.dollView.$el,
      this.$toolbox
    ]);
  }
});

var itemsInCategoryView = Backbone.View.extend({


});