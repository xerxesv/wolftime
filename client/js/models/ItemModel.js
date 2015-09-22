var ItemModel = Backbone.Model.extend({
  defaults: {
    name: "",
    draggable: true,
    imgSrc: "",
    x: 0,
    y: 0,
    z: 0
  },

  initialize: function () {

  }
});