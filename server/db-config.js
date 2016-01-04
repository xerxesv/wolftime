var mongoose = require('mongoose');
console.log('Connecting to mongodb');

if(process.env.NODE_ENV === 'production'){
  mongoose.connect('mongodb://mongo:mongo@ds040888.mongolab.com:40888/MongoLab2');
  console.log("connecting to mongo labs");
} else {
  mongoose.connect('mongodb://localhost/wolftime');
}

var db = {};

console.log('Making url schema');
db.wolfSchema = new mongoose.Schema({
  name:  String,
  password: String,
  imgUrl: String,
  model: {
    baseSrc: String,
    clothing: {
      coats: String,
      pants: String,
      tails: String
    }
  }
});

db.mongoose = mongoose;

module.exports = db;