var db = require('./db-config');

exports.createOrUpdate = function (req, res) {
  console.log('got a post request to /save');
  console.log(req.data);
  res.send(200)
};