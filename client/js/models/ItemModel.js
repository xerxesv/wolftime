var ItemModel = Backbone.Model.extend({
  defaults: {
    baseSrc: '_jacket1.png',
    name: "",
    type: "",
    draggable: true,
    imgSrc: "",
    coords: {
      x: 0,
      y: 0,
      z: 0
    }
  },

  initialize: function () {
  }
});