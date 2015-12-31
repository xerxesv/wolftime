var AppModel = Backbone.Model.extend({
  defaults: {
    collections: {
      coats: new Clothing([{name: "a nice coat", baseSrc:'_jacket1.png'}]), //should be a reference to a collection
      pants: new Clothing([{name: "good pants"}, {name: "bad pants"}, {name: "more"}, {name: "stuff"}]),
      tails: new Clothing([{name: "fox tail"}, {name: "fluffy rabbit tail"}])
    }
  },

  initialize: function () {
    this.set('curCollection', this.get('collections')['tails']); 

  }

});