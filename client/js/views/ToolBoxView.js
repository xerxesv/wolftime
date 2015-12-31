var ToolBoxView = Backbone.View.extend({


  events: {
    'click li a' : 'switchCollection'
  },

  initialize: function () {
    this.render();
  },

  switchCollection: function (e) {
    console.log('clicknig');
    var switchTo = e.currentTarget.className;
    var curCollection = this.model.get('collections')[switchTo];
    curCollection.setMeta('type',switchTo);

    // console.log('cur collection type: ', curCollection.getMeta('type'))
    this.model.set('curCollection', curCollection);
  },

  render: function () {
    var $collectionNames = $('<ul class="list-inline"></ul>');
    $collectionNames.append(_.map(this.model.get('collections'), function (collection, collectionName) {
      return '<li><a href="#" class="'+collectionName+'">' + collectionName + '</a></li>';
    }));
    this.$el.append($collectionNames);
    return this.$el;
  }
});