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

    this.on('saveClicked', this.saveWolf, this);
  },

  saveWolf: function (args) {
    this.set('name', args.name);
    this.set('password', args.password);
    this.set('imageURL', args.imageURL);
    var data = this.toJSON();
    $.ajax( 'api', {
      method: 'POST',
      processData: false,
      data: JSON.stringify(data),
      contentType:'application/json',
      
      success: function (imgURL, status, jqXHR) {
        console.log('success sending post request with jquery ajax');
        console.log(imgURL, status, jqXHR); 
        this.trigger('dudeSaved', {imgURL: imgURL, action: 'saved'});
      }.bind(this),

      error: function (jqXHR, status, error) {
        console.log('fail sending post request with jquery ajax');
        console.log(jqXHR, status, error);
        console.log('status: ', jqXHR.status); 

        if (jqXHR.status===300) {
          console.log(jqXHR.responseJSON);
          // var password = prompt('Furry with that name found in our database! Enter password to update your creation.');
          this.updateWolf(data);
        }
      }.bind(this)
    });
  },

  updateWolf: function (args) {
    console.log(args);
    $.ajax('api/' + args.name, {
      method: 'PUT',
      processData: false,
      data: JSON.stringify(args),
      contentType:'application/json',

      success: function (data, status, jqXHR) {
        console.log('success updating wolf');
        console.log(jqXHR.responseJSON);
        this.trigger('dudeSaved', {imageURL: data.imageURL, action: 'updated'});
      }.bind(this),

      error: function (jqXHR, status, error) {
        console.log('fail updateWolf');
        console.log(jqXHR, status, error);
        if (jqXHR.status === 401) {
          var password = prompt('Furry with that name found in our database! But you have entered the wrong password. Enter the correct password?');
          if (password !== null) {
            args.password = password;
            this.updateWolf(args);
          }
        } else {
          console.log('An internal server error occured. Sorry :(');
        }
      }.bind(this)
    });
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

    return json;
  }

});