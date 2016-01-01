var AppModel = Backbone.Model.extend({
  defaults: {
    collections: {
      coats: (new Clothing([{name: "nicecoat", baseSrc:'_jacket1.png'}]) ).setMeta('z-base',200).setMeta('type','coats'), //should be a reference to a collection
      pants: (new Clothing([{name: "goodpants", baseSrc:'_brown-pants.png'}, {name: "badpants"}, {name: "more"}, {name: "stuff", baseSrc:'_brown-pants.png'}]) ).setMeta('z-base',100).setMeta('type','pants'),
      tails: (new Clothing([{name: "foxtail"}, {name: "fluffyrabbittail", baseSrc:'_default_tail.png'}]) ).setMeta('z-base', 0).setMeta('type','tails')
    }
  },

  initialize: function () {
    var curCollection = this.get('collections')['tails'];

    this.set('curCollection', curCollection); 

  }

});