var ApiView = Backbone.View.extend({

  template: _.template($('#formTemplate').html()),

  initialize: function (options) {
    console.log(options.action);
    this.action = options.action;
    this.render();
  },

  events: {
    'click #cancel' : 'renderApp'
  },

  // renderApp: function () {
  //   this.$el.html('');
  //   this.$el.append('<div id="toolbox"></div>');
  //   this.$el.append('<div id="curCollection"></div>');
  //   this.$el.append('<div id="saveLoad"></div>');

  //   this.toolboxView = new ToolBoxView({
  //     model: this.model, 
  //     el: $('#toolbox') 
  //   });
  //   this.curCollectionView = new CurCollectionView({
  //     collection: this.model.get('curCollection'), 
  //     el:$('#curCollection')
  //   });
  //   this.controlsView = new ControlsView({
  //     model: this.model,
  //     el: $('#saveLoad')
  //   });

  // },

  render: function () {
    //  automatically empties contents of this.$el
    console.log('in view: ', this.action);
    this.$el.html( this.template( {
      action: this.action,
      string: this.action === 'save' ? 'share him/her with the world.' : 'modify him to suit your needs. '
    }) );
  }
});