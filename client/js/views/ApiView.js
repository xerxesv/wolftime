var ApiView = Backbone.View.extend({

  template: _.template($('#formTemplate').html()),

  initialize: function (options) {
    this.action = options.action;

    this.model.on('dudeSaved', this.dudeSaved, this);
    this.render();
  },

  events: {
    'click #submit' : 'clickSubmit',
  },


  makeImage: function () {
    // $node = $('#dollBG').clone();
    // $node.css('margin', 0);
    domtoimage.toPng(document.getElementById('dollBG'))
      .then( function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        // document.getElementById('controls').appendChild(img);
      })
      .catch(function (error) {
        console.error('wooops', error);
      });
  },

  clickSubmit: function () {
    this.makeImage();
    
    this.model.trigger('submitClicked', {
      name: this.$el.find('#username').val(), 
      password: this.$el.find('#password').val(), 
      imageURL: 'an image should be here'
    });
  },

  dudeSaved: function (imgURL) {
    this.action = 'saved';
    console.log('your dude was saved');
    console.log(imgURL);
    this.render({imgURL: imgURL});
  },


  render: function (args) {
    console.log('this.action: ', this.action);
    //  automatically empties contents of this.$el
    if (this.action === 'save' || this.action === 'retrieve') {
      this.$el.html( this.template( {
        action: this.action,
        string: this.action === 'save' ? 'share him/her with the world.' : 'modify him to suit your needs. '
      }) );      
    } else if (this.action === 'saved') {
      console.log(args.imgURL);
      var compiled = _.template($('#savedTemplate').html());      
      this.$el.html( compiled( {
        imgURL: args.imgURL
      }) );
    }

  }
});