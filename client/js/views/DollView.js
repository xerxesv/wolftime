var DollView = Backbone.View.extend({


  initialize: function () {
    this.$el.append('<div class="doll"></div>')
    this.render();
  },

  render: function () {
    var img = new Image();
    var $dollDiv = this.$el.children('.doll');
    img.src = './img/' + this.model.get('baseSrc');
    img.addEventListener('load', function (e) {
      $dollDiv.css('width', e.target.width + 'px');
      $dollDiv.css('height', e.target.height + 'px');
    })
    $dollDiv.css('background-image', 'url("./img/' + this.model.get('baseSrc') + '")');

    //generate div regions on the doll, for snapping
    _.each(this.model.get('regions'), function (regions, name) {
      // regions is an array of 4-element arrays
      // name is the object key
      _.each(regions, function (region) {
        var $div = $('<div></div>');
        $div.addClass('region');
        $div.addClass(name);
        $div.css('left', region[0] + 'px');
        $div.css('top', region[1] + 'px');
        $div.css('width', region[2] + 'px');
        $div.css('height', region[3] + 'px');
        $dollDiv.append($div);
      })
    })

    return this.$el;
  }
});