var AppView = Backbone.View.extend({

  attributes: {
    id: "app",
    class: "row"
  },

  initialize: function () {

    this.dollView = new DollView({
      model: new DollModel({baseSrc: '_default_man1.png'}),
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
      // when the user switches from one category of clothing to another
      console.log('current collection has changed');
      this.curCollectionView = new CurCollectionView({
        collection: this.model.get('curCollection'),
        el:$('#curCollection')        
      });
      this.curCollectionView.render();
    }, this);

    _.each(this.model.get('collections'), function (collection, key) {
      var $region = this.dollView.$el.find('.' + key); // one or more regions
      // when any of the models in this collection change their coordinates
      collection.on('change:coords', function (model) {
        // if there is only one region
        var regionTop = $region.offset().top;
        var regionBottom = $region.offset().top + $region.height();
        
        var regionLeft = $region.offset().left;
        var regionRight = $region.offset().left + $region.width();

        console.log('model x,y: ', model.get('coords').x, ',', model.get('coords').y );
        console.log('region left,right', regionLeft, ',', regionRight);        
        console.log('region top,bottom', regionTop, ',', regionBottom);

        if (model.get('coords').x > regionLeft && model.get('coords').x < regionRight && model.get('coords').y > regionTop && model.get('coords').y < regionBottom){
          console.log('in the region ');
          // $region.append(model.$el)
          var clothingSlot = this.dollView.model.get('clothing')[key];
          if( clothingSlot.items.length === clothingSlot.regions.length ) {
            var removedItem = clothingSlot.items.shift()
          }
          clothingSlot.items.push( collection.remove(model) );
          console.log(this.dollView.model.get('clothing'));
        }

      }, this);
      
      // every collection of clothing in the App has this listener
      // key === key of the collection in question in AppModel
      // $region === the region
      collection.on('detachEl', function ($element) {
        console.log('detachEl evented detected, a dom element has been detached from the collection');
        $element.css('top',0);
        $element.css('left',0);
        $region.append($element);

      });

    }, this);
  },

  render: function () {
      //Re-renders everything rather than re-rendering views on an individual basis. Will rarely be needed.
      this.dollView.render();
      this.toolboxView.render();
      this.curCollectionView.render();
  }

});