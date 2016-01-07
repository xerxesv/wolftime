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
      console.log('dudeSaved');

      this.set('name', args.name);
      this.set('password', args.password);
      this.set('imageURL', args.imageURL);
      $.ajax( 'save', {
        method: 'POST',
        processData: false,
        data: this.toJSON(),
        contentType:'application/json',
        success: function (data, status, jqXHR) {
          console.log('success sending post request with jquery ajax');
          console.log(data, status);
        },
        error: function (jqXHR, status, error) {
          console.log('fail sending post request with jquery ajax');
        }
      });
      
      // this.save( this.toJSON, {
      //   success: function (model, response, options) {
      //     console.log('success saving with model.save');
      //     console.log('response: ', response);
      //   },
      //   error: function (model, response, options) {
      //     console.log('error saving with model.save');
      //     console.log('response: ', response);          
      //   }
      // });

    }.bind(this) );
  },

  toJSON: function () {
    var json = {
      baseSrc: this.get('baseSrc'),
      clothing: {
        coats: [],
        tails: [],
        pants: []
      },
      imageURL: this.get('imageURL'),
      name: this.get('name') || '',
      password: this.get('password'),
    };

    _.each( this.get('clothing'), function (clothingObj, key) {
      // console.log('clothingojb.items: ', clothingObj.items);
      clothingObj.items.each(function (itemModel) {
        json.clothing[key].push( itemModel.get('name'));
      });
    }, this);

    return JSON.stringify(json);
  }

});