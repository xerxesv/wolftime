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
      this.$el.children('#curCollection').remove();
      this.$el.append(this.curCollectionView.render());
      this.bindDragEvents();
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
  },

  bindDragEvents: function () {
    var $draggable = $('.draggable');
    console.log('draggablenow :', $draggable);
    $draggable.on('mousedown', function (e) {
      var $theItem = $(this);
      var yOffset = e.pageY - $theItem.offset().top;
      var xOffset = e.pageX - $theItem.offset().left;
      $(document).on('mousemove', function (mouseMoveE) {
        $theItem.offset({ top: mouseMoveE.pageY - yOffset, left: mouseMoveE.pageX - xOffset});
      });
    });
    $draggable.on('mouseup', function (e) {
      $(document).off('mousemove');
    });
  }
});

var itemsInCategoryView = Backbone.View.extend({


});