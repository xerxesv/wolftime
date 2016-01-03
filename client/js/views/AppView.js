var AppView = Backbone.View.extend({

  attributes: {
    id: "app",
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
    this.controlsView = new ControlsView({
      model: this.model,
      el: $('#saveLoad')
    });

    this.model.on('change:curCollection', function () {
      console.log('current collection has changed');
      this.curCollectionView = new CurCollectionView({
        collection: this.model.get('curCollection'),
        el:$('#curCollection')        
      });
    }, this);


    // Bind listeners to every ItemModel in every clothing collection on the AppModel
    _.each(this.model.get('collections'), function (collection, key) {

      // TO DO: what if there's more than one region
      var $region = this.dollView.$el.find('.region.' + key); // the region or regions on the doll corresponding to that clothing type (e.g., 'coats', etc.)

      collection.on('change:coords', function (model) {

        if (helpers.inBounds(model.get('coords'), $region) ){
          console.log('in the region ');

          var clothingSlot = this.dollView.model.get('clothing')[key];
          if( clothingSlot.items.length === (clothingSlot.max || clothingSlot.regions.length) ) {
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
    
    _.each(this.dollView.model.get('clothing'), function (clothingSlot, key) {
      clothingSlot.items.on('remove', function (model, collection) {

        var type = model.get('type');
        this.model.get('collections')[type].add(model);

        $item = $('#' + model.get('name')).detach()
        if (this.model.get('curCollection').getMeta('type') === type) {
          this.curCollectionView.render();
        }
      }, this);
    }, this);

    $(window).resize( function () {
      this.curCollectionView.resize();
    }.bind(this) );

  },


  render: function () {
    this.$el.html('');

    this.$el.append('<div id="toolbox"></div>');
    
    
    this.$el.append('<div id="curCollection"></div>');      

    this.$el.append('<div id="saveLoad"></div>');

    this.toolboxView = new ToolBoxView({
      model: this.model, 
      el: $('#toolbox') 
    });
    this.curCollectionView = new CurCollectionView({
      collection: this.model.get('curCollection'), 
      el:$('#curCollection')
    });
    this.controlsView = new ControlsView({
      model: this.model,
      el: $('#saveLoad')
    });

  }

});