var DollView = Backbone.View.extend({

  attributes: {
    id: "canvas",
    class: "col-md-6"
  },

  initialize: function () {
    var srcstr = 'url("./img/' + this.model.get('baseSrc') + '")';
    this.$el.css('background-image', srcstr);
    this.render();
  },

  render: function () {
    return this.$el.html(this.model.get('baseSrc'));
  }
});

var CurCollectionView = Backbone.View.extend({
  attributes: {
    id: "curCollection",
    class: "col-md-6"
  },

  initialize: function () {
    this.$el.html(
      this.collection.map(function (item, index) {
        var itemView = new ItemView( {model: item});
        itemView.$el.css('left', index*40 + 'px');
        itemView.$el.css('top', index*20 + 'px');
        itemView.$el.css('z-index', index);
        return itemView.$el;
      })
    ); 

    this.collection.on("remove", function (model, collection) {
      console.log('a model has been removed says teh collection');
      this.render();
    }, this);   
  },

  render: function () {
    this.$el.html(
      this.collection.map(function (item, index) {
        var itemView = new ItemView( {model: item});
        itemView.$el.css('left', index*40 + 'px');
        itemView.$el.css('top', index*20 + 'px');
        itemView.$el.css('z-index', index);
        return itemView.$el;
      })
    );
    return this.$el;
  }
});

var ToolBoxView = Backbone.View.extend({
  attributes: {
    id: "toolbox",
    class: "col-md-6"
  },

  events: {
    'click li a' : 'switchCollection'
  },

  initialize: function () {
    var $collectionNames = $('<ul class="list-inline"></ul>');

    $collectionNames.append(_.map(this.model.get('collections'), function (collection, collectionName) {
      return '<li><a href="#" class="'+collectionName+'">' + collectionName + '</a></li>';
    }));
    this.$el.append($collectionNames);
  },

  switchCollection: function (e) {
    console.log('clicknig');
    var switchTo = e.currentTarget.className;
    this.model.set('curCollection', this.model.get('collections')[switchTo]);
  },

  render: function () {
    this.$el.children().detach();
    var $collectionNames = $('<ul class="list-inline"></ul>');
    $collectionNames.append(_.map(this.model.get('collections'), function (collection, collectionName) {
      return '<li><a href="#" class="'+collectionName+'">' + collectionName + '</a></li>';
    }));
    this.$el.append($collectionNames);
    return this.$el;
  }
});