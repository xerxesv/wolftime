var ItemView = Backbone.View.extend({

  attributes: {
    class: "dollItem"
  },

  initialize: function () {
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

      // register the item x, y, and z coords on the Item Model

    });


  },

  render: function () {
    return this.$el;
  }


});