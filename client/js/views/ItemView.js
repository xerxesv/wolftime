var ItemView = Backbone.View.extend({

  attributes: {
    class: "dollItem"
  },

  initialize: function () {

    this.render();
    
    this.$el.attr('id', this.model.get('name'));
    if (this.model.get('draggable')) {
      this.$el.addClass('draggable');
    }

    this.$el.on('mousedown', function (e) {
      var $theItem = $(this);
      var yOffset = e.pageY - $theItem.offset().top;
      var xOffset = e.pageX - $theItem.offset().left;
      $(document).on('mousemove', function (mouseMoveE) {
        $theItem.offset({ top: mouseMoveE.pageY - yOffset, left: mouseMoveE.pageX - xOffset});
      });
    });

    this.$el.on('mouseup', {model: this.model }, function (e) {
      $(document).off('mousemove');
      var $theItem = $(this);
      e.data.model.set('coords', {x: $theItem.offset().left, y: $theItem.offset().top, z: $theItem.css('z-index')});

      console.log('the models attributes: ', e.data.model.attributes);
      // register the item x, y, and z coords on the Item Model

    });


  },

  render: function () {
    // preloads image and adjusts div width and height to fit image
    // then sets (cached?) image as background of div
    var img = new Image();
    img.src = './img/' + this.model.get('baseSrc');
    img.addEventListener('load', function (e) {
      this.$el.css('min-width', e.target.width + 'px');
      this.$el.css('min-height', e.target.height + 'px');
    }.bind(this) );
    this.$el.css('background-image', 'url("./img/' + this.model.get('baseSrc') + '")');

    return this.$el;
  }


});