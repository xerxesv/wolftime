var DollModel = Backbone.Model.extend({
  url: 'save',
  
  defaults: {
    baseSrc: '_default_man.png',
    imgURL: '',
    clothing: {
      coats: { regions: [ [27,78,168,171] ], items: (new Clothing() ).setMeta('z-base', 200), max: 1 }, // regions: [ [topleftX, topleftY, width, height ], etc.]
      pants: { regions: [ [37,203,141,297] ], items: (new Clothing()).setMeta('z-base', 100), max: 1 },
      tails: { regions: [ [0,230,228,256] ], items: (new Clothing()).setMeta('z-base', 10), max: 2 }
    }
  },

  initialize: function () {

    // this.on('retrieved', function (newModelData) {

    // })

    this.on('saveClicked', function (args) {
      this.set('name', args.name);
      this.set('password', args.password);
      this.set('imageURL', args.imageURL);
      $.ajax( 'api', {
        method: 'POST',
        processData: false,
        data: this.toJSON(),
        contentType:'application/json',
        
        success: function (data, status, jqXHR) {
          console.log('success sending post request with jquery ajax');
          console.log(data, status, jqXHR);
          this.trigger('dudeSaved', data);
        }.bind(this),

        error: function (jqXHR, status, error) {
          console.log('fail sending post request with jquery ajax');
          console.log(jqXHR, status, error);
          console.log('status: ', jqXHR.status); 
          if (jqXHR.status===300) {
            console.log(jqXHR.responseJSON);
            alert('Somebody has already saved a furry dude with that name! Try something else.');
          }
        }.bind(this)
      });
    }, this);

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
        json.clothing[key].push( {name: itemModel.get('name'), baseSrc: itemModel.get('baseSrc'), draggable: itemModel.get('draggable')});
      });
    }, this);

    return JSON.stringify(json);
  }

});