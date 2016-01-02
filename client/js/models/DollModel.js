var DollModel = Backbone.Model.extend({
  defaults: {
    baseSrc: '_default_man.png',

    clothing: {
      coats: { regions: [ [0,82,228,178] ], items: (new Clothing() ).setMeta('z-base', 200), max: 1 }, // regions is an array of arrays with format [topleftX, topleftY, regionwidth, regionheight]
      pants: { regions: [ [48,211,143,247] ], items: (new Clothing()).setMeta('z-base', 100), max: 1 },
      tails: { regions: [ [0,230,228,270] ], items: (new Clothing()).setMeta('z-base', 10), max: 2 }
    }
  }
});