var db = require('./db-config');
var Wolf = require('./db-models.js').Wolf;
var Wolf2 = require('./db-models.js').Wolf2;

exports.createOrUpdate = function (req, res) {
  //look up a wolf with that name
  console.log(req.body);

  Wolf2.findOne({name: req.body.name}, function (err, wolf) {
    if (wolf) {
      console.log('a wolf with that name already exists');
      res.status(300).send(wolf);
    } else {
      var wolf = new Wolf2(req.body);
      wolf.save(function (err, newWolf) {
        if (err) {
          console.log('error saving the new wolf!');
          console.log(err);
        } else {
          console.log('new wolf created');
          res.status(201).send(req.body.imageURL);
        }
      })
    }
  })


};