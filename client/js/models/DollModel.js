var DollModel = Backbone.Model.extend({
  url: 'save',
  
  defaults: {
    baseSrc: '_default_man.png',

    clothing: {
      coats: { regions: [ [27,78,168,171] ], items: (new Clothing() ).setMeta('z-base', 200), max: 1 }, // regions: [ [topleftX, topleftY, width, height ], etc.]
      pants: { regions: [ [37,203,141,297] ], items: (new Clothing()).setMeta('z-base', 100), max: 1 },
      tails: { regions: [ [0,230,228,256] ], items: (new Clothing()).setMeta('z-base', 10), max: 2 }
    }
  },

  initialize: function () {


    this.on('dudeSaved', function (args) {
      console.log(args);
      this.set('name', args.name);
      this.set('password', args.password);
      this.set('imageURL', args.imageURL);
      
      this.save({ }, {
        success: function (model, response, options) {
          console.log('success saving');
        },
        error: function (model, response, options) {
          console.log('error saving');
        }
      });

    }, this);
  }


});