var ControlsView = Backbone.View.extend({

  initialize: function () {
    this.render();
  },

  // events: {
  //   'click li a' : 'apiView'

  // },

  // apiView: function (e) {
  //   this.model.set('curControl', e.currentTarget.id);
  //   this.apiView = new ApiView( {
  //     model: this.model,
  //     el: $('#controls')
  //   });
  // },

  render: function () {
    this.$el.html('<ul><li><a href="#a/save" id="save">Save Dude</a></li><li><a href="#a/retrieve" id="retrieve">Retrieve Dude</a></li></ul>');
  }
});