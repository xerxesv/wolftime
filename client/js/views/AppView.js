var AppView = Backbone.View.extend({

  attributes: {
    id: "app",
  },

  initialize: function () {

    var doll = new DollModel({baseSrc: '_default_man.png'});
        
    this.dollView = new DollView({
      model: doll,
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

    router.on('route:api', function (action) {
      if (!this.apiView) {
        this.apiView = new ApiView( {
          model: doll,
          el: $('#controls'),
          action: action
        });
      } else {
        this.apiView.action = action;
        this.apiView.render();
      }
    }, this);

    router.on('route:index', function () {
      if($('#toolbox').length < 1) {
        console.log('toolbox length < 1');
        console.log(this.toolboxView);
        this.render();
      }      
    }, this);

    Backbone.history.start();

    this.model.on('change:curCollection', function (model, value) {
      this.curCollectionView.switchCollection(value);
    }, this);

    this.model.on('changeDoll', function (newModelData) {
      console.log(newModelData);
      var oldDoll = doll;
      doll = new DollModel( {baseSrc: newModelData.baseSrc, name: newModelData.name} );

      _.each( oldDoll.get('clothing'), function (clothingType, key) {
        if (clothingType.items.length > 0) {
         this.model.get('collections')[key].add( clothingType.items.remove( clothingType.items.models ) );
        }
      }, this);
      
      _.each(newModelData.clothing, function (clothingType, key) { // clothingType: [{},{} ...]
        if (clothingType.length > 0) {

          _.each(clothingType, function (item, index) {

            var removed = this.model.get('collections')[key].remove( this.model.get('collections')[key].findWhere({ name: item.name}) );
            doll.get('clothing')[key].items.push( removed );

          }, this);
        }
      }, this);

      delete oldDoll;
      this.dollView.model = doll;
      this.dollView.render();

    }, this)

    // Bind listeners to every ItemModel in every clothing collection on the AppModel
    _.each(this.model.get('collections'), function (collection, key) {

      // TO DO: what if there's more than one region
      var $region = this.dollView.$el.find('.region.' + key); // the region or regions on the doll corresponding to that clothing type (e.g., 'coats', etc.)

      collection.on('change:coords', function (model) {
        if (helpers.inBounds(model.get('coords'), $region) ){
          var clothingSlot = this.dollView.model.get('clothing')[key];
          if( clothingSlot.items.length === (clothingSlot.max || clothingSlot.regions.length) ) {
            var removedItem = clothingSlot.items.shift();
          }
          clothingSlot.items.push( collection.remove(model) );
        }

      }, this);
      
      collection.on('elDetached', function ($element) {
        this.dollView.attachEl($element, $region);

      }, this);
    }, this);
    
    _.each(this.dollView.model.get('clothing'), function (clothingSlot, key) {
      clothingSlot.items.on('remove', function (model, collection) {

        var type = model.get('type');
        this.model.get('collections')[type].add(model);

        $item = $('#' + model.get('name')).detach()
        if (this.model.get('curCollection').getMeta('type') === type) {
          this.curCollectionView.$el.append($item);
          this.curCollectionView.render();
        }
      }, this);
    }, this);

    $(window).resize( function () {
      if($('#curCollection').length > 0) {
        this.curCollectionView.resize();
      }
    }.bind(this) );

  },


  render: function () {
    this.$el.html('');
    $toolbox = $('<div id="toolbox"></div>').appendTo(this.$el);
    $curCollection = $('<div id="curCollection"></div>').appendTo(this.$el);
    $saveLoad = $('<div id="saveLoad"></div>').appendTo(this.$el);

    this.toolboxView.setElement($toolbox);
    this.toolboxView.render();

    this.curCollectionView.setElement($curCollection);
    this.curCollectionView.render();

    this.controlsView.setElement($saveLoad);
    this.controlsView.render();

  }

});