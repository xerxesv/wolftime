var ItemModel = Backbone.Model.extend({
  defaults: {
    baseSrc: '_jacket1.png',
    name: "",
    type: "",
    draggable: true,
    coords: {
      x: 0,
      y: 0,
      z: 0
    },
    topLeftCoords: {
      x: null,
      y: null
    }
  },

  initialize: function () {
  }
});