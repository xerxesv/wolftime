var DollView = Backbone.View.extend({


  initialize: function () {
    this.$el.html('');
    $dollContainer = $('<div id="dollContainer"></div>').appendTo(this.$el);
    $dollBG = $('<div id="dollBG"></div>').appendTo($dollContainer);
    this.render();

    _.each(this.model.get('clothing'), function (clothingType) {
      clothingType.items.on('add', function (model, collection) {
      });

      clothingType.items.on('change:coords', function (model) {
        var outOfBounds = clothingType.regions.every( function (region) {
          return !helpers.inBounds(model.get('coords'), region);
        });
        if (outOfBounds) {
          clothingType.items.remove(model);
        }    
      })
    });
    
    var $overlays = $dollBG.children('.overlay');

    if ($overlays.length > 0) {

      $overlays.each( function (index, element) {
        
        $(this).on('mousedown', function(e) {
          console.log('overlaymousedown triggered');
          var name = $(this).attr('class').toString().split(' ')[1];

          if( $dollBG.children('.region.'+name).children().length > 0) {
            var jQueryMouseDown = jQuery.Event('mousedown', { pageX: e.pageX, pageY: e.pageY, offsetX: e.offsetX, offsetY: e.offsetY });
            var $item = $dollBG.children('.region.'+name).children().first();

            $item.trigger(jQueryMouseDown);

            $(document).on('mouseup', function (docMouseUpEvent) {
              $(document).off('mouseup');
              $item.trigger('mouseup');
            });
          }
          
        });
      })
    }
  },

  render: function () {
    console.log('doll attributes: ', this.model.attributes);
    var img = new Image();
    var $dollContainer = this.$el.children('#dollContainer');
    var $dollBG = $dollContainer.children('#dollBG');

    $dollDiv = $('<div class="dollDiv"></div>').appendTo($dollBG);
    $dollDiv.css('z-index', 50);


    img.src = './img/' + this.model.get('baseSrc');
    img.addEventListener('load', function (e) {
      $dollContainer.css('width', e.target.width + 'px');
      $dollBG.css('width', e.target.width + 'px');
      $dollBG.css('height', e.target.height + 'px');
      $dollDiv.css('width', e.target.width + 'px');
      $dollDiv.css('height', e.target.height + 'px');
    });

    $dollDiv.css('background-image', 'url("./img/' + this.model.get('baseSrc') + '")');
    var topOverlayZ = parseInt($dollDiv.css('z-index'));
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

        if (clothingType.items.length > 0) {
          clothingType.items.each( function (item, index, collection) {
            var itemView = new ItemView( {model: item} );
            // itemView.$el.css('z-index', collection.getMeta('z-base') + index);
            this.attachEl( itemView.$el, $div)            
          }.bind(this) );
        }
        $dollBG.append($div);
  
        if(clothingType.items.getMeta('z-base') < topOverlayZ ) {
          topOverlayZ++;
          var $div = $('<div></div>');
          $div.addClass('overlay');
          $div.addClass(name);
          $div.css('left', region[0] + 'px');
          $div.css('top', region[1] + 'px');
          $div.css('width', region[2] + 'px');
          $div.css('height', region[3] + 'px');
          $div.css('z-index',  topOverlayZ);
          $dollBG.append($div);

        }
        
      }, this);
    }, this);
    return this.$el;
  },

  detachEl: function () {

  },

  attachEl: function ($element, $region) {
    $region = $region || $element.attr('class').toString().split(' ')[1];
    $element.css('top', 0);
    $element.css('left', 0);
    $region.append($element);
  }
});