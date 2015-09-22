var ItemView = Backbone.View.extend({

  attributes: {
    class: "dollItem"
  },

  initialize: function () {
    this.$el.attr('id', this.model.get('name'));
    if (this.model.get('draggable')) {
      this.$el.addClass('draggable');
    }

  },

  render: function () {
    return this.$el;
  }


});