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

      var $theItem = $(this);
      $theItem.css('cursor', 'grabbing');
      $(document).on('mousemove', function (mouseMoveE) {
        $theItem.offset({ top: mouseMoveE.pageY - e.offsetY, left: mouseMoveE.pageX - e.offsetX});
      });
    });

    this.$el.on('mouseup', {model: this.model }, function (e) {
      $(document).off('mousemove');
      var $theItem = $(this);
      // $theItem.css('cursor', 'unset');
      var offset = $('#curCollection').length > 0 ? $('#curCollection').offset() : $('#controls').offset();
      e.data.model.set('topLeftCoords', {x: $theItem.offset().left - offset.left, y: $theItem.offset().top - offset.top});
      e.data.model.set('coords', {x: e.pageX, y: e.pageY, z: parseInt($theItem.css('z-index'))});

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
      this.$el.css('width', e.target.width + 'px');
      this.$el.css('height', e.target.height + 'px');
    }.bind(this) );
    this.$el.css('background-image', 'url("./img/' + this.model.get('baseSrc') + '")');

    return this.$el;
  }


});