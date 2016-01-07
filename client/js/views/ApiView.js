var ApiView = Backbone.View.extend({

  template: _.template($('#formTemplate').html()),

  initialize: function (options) {
    this.action = options.action;
    this.render();
  },

  events: {
    'click #submit' : 'makeImage',
  },

  makeImage: function () {
    // $node = $('#dollBG').clone();
    // $node.css('margin', 0);
    console.log('makeImage event happening');
    
    domtoimage.toPng(document.getElementById('dollBG'))
      .then( function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.getElementById('controls').appendChild(img);
      })
      .catch(function (error) {
        console.error('wooops', error);
      });

    this.model.trigger('dudeSaved', {
      name: this.$el.find('#username').val(), 
      password: this.$el.find('#password').val(), 
      imageURL: 'an image should be here'
    });
  },

  render: function () {
    //  automatically empties contents of this.$el
    this.$el.html( this.template( {
      action: this.action,
      string: this.action === 'save' ? 'share him/her with the world.' : 'modify him to suit your needs. '
    }) );
  }
});