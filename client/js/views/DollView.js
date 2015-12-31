var DollView = Backbone.View.extend({


  initialize: function () {
    this.$el.append('<div class="doll"></div>')
    this.render();
  },

  render: function () {
    var img = new Image();
    var $dollDiv = this.$el.children('.doll');

    console.log('dolldiv found? ', $dollDiv);

    img.src = './img/' + this.model.get('baseSrc');
    img.addEventListener('load', function (e) {
      $dollDiv.css('width', e.target.width + 'px');
      $dollDiv.css('height', e.target.height + 'px');
    })
    $dollDiv.css('background-image', 'url("./img/' + this.model.get('baseSrc') + '")');

    return this.$el;
  }
});