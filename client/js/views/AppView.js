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

      // TO DO: what if there's more than one region
      var $region = this.dollView.$el.find('.region.' + key); // the region or regions on the doll corresponding to that clothing type (e.g., 'coats', etc.)

      collection.on('change:coords', function (model) {

        if (helpers.inBounds(model.get('coords'), $region) ){
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
      

      collection.on('elDetached', function ($element) {
        console.log('elDetached evented detected, a dom element has been detached from the collection');
        console.log('attaching it to the doll')
        this.dollView.attachEl($element, $region);

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