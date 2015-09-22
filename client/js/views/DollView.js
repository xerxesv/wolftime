var DollView = Backbone.View.extend({

  attributes: {
    id: "canvas",
    class: "col-md-6"
  },

  initialize: function () {
    var srcstr = 'url("./img/' + this.model.get('baseSrc') + '")';
    console.log("base: ", srcstr);
    this.$el.css('background-image', srcstr);
    this.render();
  },

  render: function () {
    return this.$el.html(this.model.get('baseSrc'));
  }

});
