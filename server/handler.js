var db = require('./db-config');
var Wolf = require('./db-models.js').Wolf;

exports.createOrUpdate = function (req, res) {
  //look up a wolf with that name
  Wolf.findOne({username: req.body.name}, function (err, wolf) {
    if (wolf) {
      console.log('a wolf with that name already exits');
      res.send(300);
    } else {
      var wolf = new Wolf(req.body);
      wolf.save(function (err, newWolf) {
        if (err) {
          console.log('error saving the new wolf!');
          console.log(err);
        } else {
          console.log('new wolf created');
        }
      })
    }
  })

  console.log('got a post request to /save');
  console.log(req.body);
  res.send(200)
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