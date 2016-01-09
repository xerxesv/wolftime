var ApiView = Backbone.View.extend({

  template: window.JST['formTemplate'],

  initialize: function (options) {
    this.action = options.action;

    this.model.on('dudeSaved', this.dudeSaved, this);
    this.render();
  },

  events: {
    'click button#save' : 'clickSave',
    'click button#retrieve' : 'clickRetrieve'
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

  clickRetrieve: function () {
    var $name = this.$el.find('#username');
    var $password = this.$el.find('#password');

    if ( $name.val() && $password.val() ) {

      $.ajax('api/' + $name.val(), {
        method: 'POST',
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify({password: $password.val()}),

        success: function (data, status, jqXHR) {
          console.log(jqXHR.responseJSON);
          appModel.trigger('changeDoll', jqXHR.responseJSON);
        },

        error: function (jqXHR, status, error) {
          if (jqXHR.status === 401) {
            alert('The wrong password for that wolfman! Don\'t try to hack a fursona that isn\'t yours!')
          } else {
            alert('A furry with that name does not exist in our database. Go ahead and create your own!');
          }
        }

      });

      // this.model.trigger('retrieveClicked', {
      //   name: $name.val(), 
      //   password: $password.val() 
      // });
    } else {
      alert('Gotta have a name and a password!')
    }    
  },

  clickSave: function () {
    var $name = this.$el.find('#username');
    var $password = this.$el.find('#password');
    if ( $name.val() && $password.val() ) {
      this.makeImage();
      this.model.trigger('saveClicked', {
        name: $name.val(), 
        password: $password.val(), 
        imageURL: 'an image should be here'
      });
    } else {
      alert('Gotta have a name and a password!')
    }

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
      this.$el.html( window.JST['savedTemplate']( {
        imgURL: args.imgURL
      }) );
    }

  }
});