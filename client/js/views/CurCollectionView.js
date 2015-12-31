var CurCollectionView = Backbone.View.extend({

  initialize: function () {
    this.render();


    this.collection.on("remove", function (model, collection) {
      console.log('a model has been removed says teh collection');
     this.render();
    }, this);   
  },

  render: function () {
    this.$el.html(
      this.collection.map(function (item, index) {
        var itemView = new ItemView( {model: item});
        itemView.$el.css('left', index*40 + 'px');
        itemView.$el.css('top', index*20 + 'px');
        itemView.$el.css('z-index', index);
        return itemView.$el;
      })
    );
    return this.$el;
  }
});