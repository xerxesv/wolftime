var ItemView = Backbone.View.extend({

  attributes: {
    class: "dollItem"
  },

  initialize: function () {

    this.$el.attr('id', this.model.get('name'));
    this.$el.addClass(this.model.get('type'));
    if (this.model.get('draggable')) {
      this.$el.addClass('draggable');
    }

    this.$el.on('mousedown', function (e) {

      console.log('mousedown triggered');
      var $theItem = $(this);
      var yOffset = e.pageY - $theItem.offset().top;
      var xOffset = e.pageX - $theItem.offset().left;

      console.log('event: ', e);
      $(document).on('mousemove', function (mouseMoveE) {
        console.log('triggering document on mousemove');
        $theItem.offset({ top: mouseMoveE.pageY - e.offsetY, left: mouseMoveE.pageX - e.offsetX});
      });
    });

    this.$el.on('mouseup', {model: this.model }, function (e) {

      console.log('mouseup triggered, name of the model in mouseup: ', e.data.model.get('name'));
      console.log(e);
      $(document).off('mousemove');
      var $theItem = $(this);
      var offset = $('#curCollection').offset();
      e.data.model.set('topLeftCoords', {x: $theItem.offset().left, y: $theItem.offset().top});
      e.data.model.set('coords', {x: e.pageX, y: e.pageY, z: $theItem.css('z-index')});

      // fix bug for when #curCollection is not in the DOM
      $(this).data('offset', {left: $theItem.offset().left - offset.left, top: $theItem.offset().top - offset.top });
      // console.log('the models attributes: ', e.data.model.attributes);
      // console.log('the models coordinats: ', e.data.model.attributes.coords.x, ',', e.data.model.attributes.coords.y);
      // console.log('the modelss offset: ', $(this).data('offset'));
    });

    this.render();

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