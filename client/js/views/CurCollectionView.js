var CurCollectionView = Backbone.View.extend({
  attributes: {
    id: 'curCollection'
  },
  initialize: function () {

    if (!this.collection._events || !this.collection._events['remove']) {
      this.collection.on("remove", function (model, collection) {
        this.collection.trigger('elDetached', this.detachEl(model));
      }, this);
    }


    this.collection.on("add", function (item) {
      console.log('something added back to ', this.collection.getMeta('type'));
      console.log(item)
    },this);   

    this.render();
  },

  switchCollection: function (newCollection) {
    this.collection = newCollection;
    this.initialize();
  },

  render: function () {
    //possible performance issue with creating new item views on each render
    var offset = this.$el.offset();
    var elementHeight = this.$el.height( $(window).height() - parseInt($('#toolbox').css('padding')) * 2 - parseInt(this.$el.css('padding')) - offset.top);
    var elementWidth = this.$el.width();
  
    
    this.$el.html(
      this.collection.map(function (item, index) {
        item.set('type', this.collection.getMeta('type'));
        var itemView = new ItemView( {model: item});
        var offset = this.$el.offset();
        

        console.log(itemView.model.get('name'), ': ', itemView.model.get('topLeftCoords').x, ',', itemView.model.get('topLeftCoords').y)
        if (itemView.model.get('topLeftCoords').x !== null || itemView.model.get('topLeftCoords').y !== null) {

          itemView.$el.css('left', itemView.model.get('topLeftCoords').x + offset.left + 'px');          
          itemView.$el.css('top', itemView.model.get('topLeftCoords').y + offset.top + 'px');

        } else {

          itemView.$el.css('left', offset.left + 20 + (Math.random() * (elementWidth - 150)) + 'px');
          itemView.$el.css('top', offset.top + 20 + (Math.floor(index / 5)) * 20 + 'px');

          itemView.model.set('topLeftCoords', {x: parseInt(itemView.$el.css('left')) - offset.left, y: parseInt(itemView.$el.css('top')) - offset.top} );
        }


        itemView.$el.data('offset', {left: itemView.model.get('topLeftCoords').x, top: itemView.model.get('topLeftCoords').y});

        itemView.$el.css('z-index', this.collection.getMeta('z-base') + index + 1);
        return itemView.$el;
      }, this)

    );
    return this.$el;
  },

  resize: function () {
    var offset = this.$el.offset();
    this.$el.height( $(window).height() - parseInt($('#toolbox').css('padding')) * 2 - parseInt(this.$el.css('padding')) - offset.top);
    this.$el.children('.dollItem').each( function (index) {
      $(this).css('left', offset.left + $(this).data('offset').left );
      $(this).css('top', offset.top + $(this).data('offset').top );

    });

  },

  detachEl: function (model) {
    return $('#' + model.get('name')).detach();
  }
});