var AppModel = Backbone.Model.extend({
  defaults: {
    collections: {
      coats: (new Clothing([{name: "nicecoat", baseSrc:'_jacket1.png'}, {name: "redfox", baseSrc:'top1.png'}]) ).setMeta('z-base',200).setMeta('type','coats'), //should be a reference to a collection
      pants: (new Clothing([{name: "goodpants", baseSrc:'_brown-pants.png'}, {name: "redfoxpants", baseSrc:'pants1.png'}, {name: "stuff", baseSrc:'_brown-pants.png'}]) ).setMeta('z-base',100).setMeta('type','pants'),
      tails: (new Clothing([{name: "foxtail", baseSrc:'tail1.png'}, {name: "fluffyrabbittail", baseSrc:'_default_tail.png'}]) ).setMeta('z-base', 10).setMeta('type','tails')
    }
  },

  initialize: function () {
    var curCollection = this.get('collections')['tails'];

    this.set('curCollection', curCollection); 

  }

});