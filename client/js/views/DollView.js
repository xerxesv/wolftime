var DollView = Backbone.View.extend({


  initialize: function () {
    $dollBG = $('<div class="dollBG"></div>').appendTo(this.$el);
    $dollDiv = $('<div class="dollDiv"></div>').appendTo($dollBG);
    $dollDiv.css('z-index', 50);
    this.render();

    _.each(this.model.get('clothing'), function (clothingType) {
      clothingType.items.on('add', function (model, collection) {
        console.log('a model has been added to the clothing collection')
      });

      clothingType.items.on('change:coords', function (model) {
        var outOfBounds = clothingType.regions.every( function (region) {
          return !helpers.inBounds(model.get('coords'), region);
        });
        if (outOfBounds) {
          console.log('out of bounds, removing from model');
          clothingType.items.remove(model)
          // fire an event to the appView, passing the model and its el (find the el by jquery search of the model's name)
              // the appView puts the model in its proper collection
              // the appView detaches the el from the DOM
                // if the model name doesn't match the type of the current collection
                  // the el simply disappears, maybe with some animation showing where it's going
                // if the model matches the type of the current collection
                  // the app view passes the el to CurCollectionView's' attachEl function, (maybe some animation)
                

            // if this puts it in the currently selected collection, have the collection rerender (via a listener on CurCollection), maybe animate it going to its new position

            // if it's not in the currently selected col, have it disappear (later with some kind of ok looking animation)
        }    
      })

    })
  },

  render: function () {
    var img = new Image();
    var $dollBG = this.$el.children('.dollBG');
    var $dollDiv = $dollBG.children('.dollDiv');

    img.src = './img/' + this.model.get('baseSrc');
    img.addEventListener('load', function (e) {
      $dollBG.css('width', e.target.width + 'px');
      $dollBG.css('height', e.target.height + 'px');
      $dollDiv.css('width', e.target.width + 'px');
      $dollDiv.css('height', e.target.height + 'px');
    });

    $dollDiv.css('background-image', 'url("./img/' + this.model.get('baseSrc') + '")');

    //generate div regions on the doll, for snapping
    _.each(this.model.get('clothing'), function (clothingType, name) {
      // clothingType.regions is an array of 4-element arrays
      // name is the name of the clothing type, e.g. 'coats'
      _.each(clothingType.regions, function (region) {
        var $div = $('<div></div>');
        $div.addClass('region');
        $div.addClass(name);
        $div.css('left', region[0] + 'px');
        $div.css('top', region[1] + 'px');
        $div.css('width', region[2] + 'px');
        $div.css('height', region[3] + 'px');
        $div.css('z-index', clothingType.items.getMeta('z-base'));
        $dollBG.append($div);
      });
    })
    return this.$el;
  },

  detachEl: function () {

  },

  attachEl: function ($element, $region) {
    console.log($element.attr('class').toString().split(' ')[1]);
    $region = $region || $element.attr('class').toString().split(' ')[1];
    $element.css('top', 0);
    $element.css('left', 0);
    $region.append($element);
  }
});