var db = require('./db-config');
var Wolf = require('./db-models.js').Wolf;
var Wolf2 = require('./db-models.js').Wolf2;

exports.createOrUpdate = function (req, res) {
  //look up a wolf with that name
  console.log(req.body);

  Wolf2.findOne({name: req.body.name}, function (err, wolf) {
    if (wolf) {
      console.log('a wolf with that name already exits');
      res.sendStatus(300);
    } else {
      var wolf = new Wolf2(req.body);
      wolf.save(function (err, newWolf) {
        if (err) {
          console.log('error saving the new wolf!');
          console.log(err);
        } else {
          console.log('new wolf created');
          res.sendStatus(201);
        }
      })
    }
  })


};

/* 
Click.findOrCreate({ip: '127.0.0.1'}, function(err, click, created) {
  // created will be true here
  console.log('A new click from "%s" was inserted', click.ip);
  Click.findOrCreate({}, function(err, click, created) {
    // created will be false here
    console.log('Did not create a new click for "%s"', click.ip);
  })
});

You can also include properties that aren't used in the find call, but will be added to the object if it is created.

Click.create({ip: '127.0.0.1'}, {browser: 'Mozilla'}, function(err, val) {
  Click.findOrCreate({ip: '127.0.0.1'}, {browser: 'Chrome'}, function(err, click) {
    console.log('A click from "%s" using "%s" was found', click.ip, click.browser);
    // prints A click from "127.0.0.1" using "Mozilla" was found
  })
});
*/