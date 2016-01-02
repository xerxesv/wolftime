var CurCollectionView = Backbone.View.extend({

  initialize: function () {

    this.collection.on("remove", function (model, collection) {
      this.collection.trigger('elDetached', this.detachEl(model));
    }, this);

    // this.collection.on("add", function () {
    //   console.log('something added back to ', this.collection.getMeta('type'));
    //   this.render();
    // },this)   

    this.render();
  },

  render: function () {
    var offset = this.$el.offset();
    this.$el.html(
      this.collection.map(function (item, index) {
        item.set('type', this.collection.getMeta('type'));
        var itemView = new ItemView( {model: item});
        itemView.$el.css('left', offset.left + index*40 + 'px');
        itemView.$el.css('top', offset.top + index*20 + 'px');
        itemView.$el.css('z-index', this.collection.getMeta('z-base') + index + 1);
        itemView.$el.data('offset', {left: index*40, top:index*20});

        console.log(itemView.$el.data('offset'))
        return itemView.$el;
      }, this)
    );
    return this.$el;
  },

  resize: function () {
    var offset = this.$el.offset();
    this.$el.children('.dollItem').each( function (index) {
      console.log(offset.left)
      $(this).css('left', offset.left + $(this).data('offset').left );
      $(this).css('top', offset.top + $(this).data('offset').top );

    });
  },

  detachEl: function (model) {
    console.log('detaching element from model');
    return $('#' + model.get('name')).detach();
  }
});