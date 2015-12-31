var DollModel = Backbone.Model.extend({
  defaults: {
    baseSrc: '_default_man1.png',
    clothing: {},
    regions: {
      coats: [ [0,82,228,178] ], // each array has format [topleftX, topleftY, regionwidth, regionheight]
      pants: [ [48,211,143,247] ],
      tails: [ [0,230,228,270] ]
    }
  }
});