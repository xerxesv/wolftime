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

    this.$toolbox = $('<div class="col-md-6" id="toolbox">TOllbox yo</div>')

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