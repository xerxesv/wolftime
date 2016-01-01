var DollModel = Backbone.Model.extend({
  defaults: {
    baseSrc: '_default_man1.png',

    clothing: {
      coats: { regions: [ [0,82,228,178] ], items: new Clothing() }, // regions is an array of arrays with format [topleftX, topleftY, regionwidth, regionheight]
      pants: { regions: [ [48,211,143,247] ], items: new Clothing() },
      tails: { regions: [ [0,230,228,270] ], items: new Clothing() }
    }
  }
});