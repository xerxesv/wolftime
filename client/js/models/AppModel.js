var AppModel = Backbone.Model.extend({
  defaults: {
    currentCollection: ["coat1", "coat2", "coat3"], // should be this.get('coats'),
    collections: {
      coats: "some coats", //should be a reference to a collection
      pants: "some pants",
      tails: "some tails",
      ears: "some ears"
    }
  }

});