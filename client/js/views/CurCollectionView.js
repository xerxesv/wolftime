var CurCollectionView = Backbone.View.extend({

  initialize: function () {
    this.render();

    // console.log('the type of collection for this view is: ', this.collection.getMeta('type'));


    this.collection.on("remove", function (model, collection) {
      console.log('a model has been removed says teh collection');
      this.collection.trigger('detachEl', this.detachEl(model));
    }, this);   
  },

  render: function () {
    this.$el.html(
      this.collection.map(function (item, index) {
        item.set('type', this.collection.getMeta('type'));
        var itemView = new ItemView( {model: item});
        itemView.$el.css('left', index*40 + 'px');
        itemView.$el.css('top', index*20 + 'px');
        itemView.$el.css('z-index', this.collection.getMeta('z-base') + index);
        return itemView.$el;
      }, this)
    );
    return this.$el;
  },

  detachEl: function (model) {
    console.log('detaching element from model: ', $('#' + model.get('name') ));
    return $('#' + model.get('name')).detach();
  }
});