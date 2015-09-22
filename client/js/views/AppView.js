var AppView = Backbone.View.extend({

  attributes: {
    id: "app",
    class: "row"
  },

  template: _.template('<div>JACKET</div>'),

  initialize: function () {

    this.dollView = new DollView({
      model: new DollModel({baseSrc: '_default_man.png'})
    });
    this.toolboxView = new ToolBoxView({model: this.model });
    this.curCollectionView = new CurCollectionView({collection: this.model.get('curCollection')});

    this.model.on('change:curCollection', function () {
      console.log('current collection has changed');
      this.curCollectionView = new CurCollectionView({collection: this.model.get('curCollection')});
      this.render();
    }, this);
  },

  render: function () {
    this.$el.children().detach();
    console.log('rendering app...' + this.toolboxView.$el)
    return this.$el.html([
      this.dollView.render(),
      this.toolboxView.render(),
      this.curCollectionView.render()
    ]);
  }
});

var itemsInCategoryView = Backbone.View.extend({


});