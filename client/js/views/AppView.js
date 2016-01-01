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


    // Triggered when the user clicks on a link in the ToolBoxView to change the currently selected collection
    this.model.on('change:curCollection', function () {
      console.log('current collection has changed');
      this.curCollectionView = new CurCollectionView({
        collection: this.model.get('curCollection'),
        el:$('#curCollection')        
      });
      this.curCollectionView.render();
    }, this);

    // Bind listeners to every ItemModel in every clothing collection on the AppModel
    _.each(this.model.get('collections'), function (collection, key) {

      var $region = this.dollView.$el.find('.region.' + key); // the region or regions on the doll corresponding to that clothing type (e.g., 'coats', etc.)

      collection.on('change:coords', function (model) {
        // TO DO: what if there's more than one region
        var regionTop = this.getBounds($region).top;
        var regionBottom = this.getBounds($region).bottom;
        
        var regionLeft = this.getBounds($region).left;
        var regionRight = this.getBounds($region).right;

        console.log('model x,y: ', model.get('coords').x, ',', model.get('coords').y );
        console.log('region left,right', regionLeft, ',', regionRight);        
        console.log('region top,bottom', regionTop, ',', regionBottom);

        if (collection.contains(model) && model.get('coords').x > regionLeft && model.get('coords').x < regionRight && model.get('coords').y > regionTop && model.get('coords').y < regionBottom){
          console.log('in the region ');
          // $region.append(model.$el)
          var clothingSlot = this.dollView.model.get('clothing')[key];
          if( clothingSlot.items.length === clothingSlot.regions.length ) {
            var removedItem = clothingSlot.items.shift()
          }
          clothingSlot.items.push( collection.remove(model) );
          console.log(this.dollView.model.get('clothing'));
        } else if (!collection.contains(model) && model.get('coords').x > this.getBounds(this.curCollectionView.$el).left && model.get('coords').x < this.getBounds(this.curCollectionView.$el).right && model.get('coords').y > this.getBounds(this.curCollectionView.$el).top && model.get('coords').y < this.getBounds(this.curCollectionView.$el).bottom ) {

          console.log('putting back in the toolbox');

        } 

      }, this);
      
      // every collection of clothing in the App has this listener
      // key === key of the collection in question in AppModel
      // $region === the region
      collection.on('elDetached', function ($element) {
        console.log('elDetached evented detected, a dom element has been detached from the collection');
        $element.css('top',0);
        $element.css('left',0);
        $region.append($element);

      });

    }, this);
  },

  getBounds: function ($element) {
    var bounds = $element.offset();
    bounds.right = bounds.left + $element.width();
    bounds.bottom = bounds.top + $element.height();
    return bounds;
  },

  render: function () {
      //Re-renders everything rather than re-rendering views on an individual basis. Will rarely be needed.
      this.dollView.render();
      this.toolboxView.render();
      this.curCollectionView.render();
  }

});