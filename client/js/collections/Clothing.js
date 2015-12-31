var Clothing = Backbone.Collection.extend({
  model: ItemModel,

  initialize: function () {
    this._meta = {};

  },

  setMeta: function (key, value) {
    this._meta[key] = value;
    return this;
  },

  getMeta: function (key) {
    return this._meta[key];
  }
});