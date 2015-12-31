var AppView = Backbone.View.extend({

  attributes: {
    id: "app",
    class: "row"
  },

  initialize: function () {

    this.dollView = new DollView({
      model: new DollModel({baseSrc: '_default_man.png'}),
      el: $('#canvas')
    });
    this.toolboxView = new ToolBoxView({
      model: this.model, 
      el: $('#toolbox') 
    });
    this.curCollectionView = new CurCollectionView({
      collection: this.model.get('curCollection'), 
      el:$('#curCollection')
    });


    this.model.on('change:curCollection', function () {
      console.log('current collection has changed');
      this.curCollectionView = new CurCollectionView({
        collection: this.model.get('curCollection'),
        el:$('#curCollection')        
      });
      this.curCollectionView.render();
    }, this);

    _.each(this.model.get('collections'), function (collection) {
      collection.on('change:coords', function (model) {        
        
        var canvasTop = this.dollView.$el.offset().top;
        var canvasBottom = this.dollView.$el.offset().top + this.dollView.$el.height();
        
        var canvasLeft = this.dollView.$el.offset().left;
        var canvasRight = this.dollView.$el.offset().left + this.dollView.$el.width();

        if (model.get('coords').x > canvasLeft && model.get('coords').x < canvasRight && model.get('coords').y > canvasTop && model.get('coords').y < canvasBottom){
          console.log('model removed');
          collection.remove(model);
        }

      }, this);

    }, this);
  },

  render: function () {
      //Re-renders everything rather than re-rendering views on an individual basis. Will rarely be needed.
      this.dollView.render();
      this.toolboxView.render();
      this.curCollectionView.render();
  }

});

var itemsInCategoryView = Backbone.View.extend({


});