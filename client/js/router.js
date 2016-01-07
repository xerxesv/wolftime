var WolfRouter = Backbone.Router.extend( {
    
    routes: {
      'a/:action': 'api',
      'a':'index',
      '':'index'
    }
});

var router = new WolfRouter();
