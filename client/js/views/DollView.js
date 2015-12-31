var DollView = Backbone.View.extend({


  initialize: function () {
    this.render();
  },

  render: function () {

    var srcstr = './img/' + this.model.get('baseSrc');
    $img = $('<img class="doll">');
    $img.attr('src', srcstr);

    return this.$el.append($img);
  }
});