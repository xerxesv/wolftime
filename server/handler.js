var db = require('./db-config');
var Wolf = require('./db-models.js').Wolf;
var Wolf2 = require('./db-models.js').Wolf2;

exports.createWolf = function (req, res) {
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
      });
    }
  });
};

exports.retrieveWolf = function (req, res) {
  console.log(req.params.name);
  console.log(req.body.password);
  Wolf2.findOne({name: req.params.name}, function (err, wolf) {
    if (wolf) {
      console.log('Found the wolf, checking password...');
      wolf.comparePassword(req.body.password, function (isMatch) {
        if (isMatch) {
          console.log('Password matches.')
          res.status(200).send(wolf);
        } else {
          console.log('Password doesn\'t match');
          res.status(401).send('Unauthorized');
        }
      });
    } else {
      console.log('error? ', err);
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(404).send({name: req.params.name});
      }
    }
  });



};