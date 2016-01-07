var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

console.log('Connecting to mongodb');

if(process.env.NODE_ENV === 'production'){
  mongoose.connect('mongodb://mongo:mongo@ds040888.mongolab.com:40888/MongoLab2');
  console.log("connecting to mongo labs");
} else {
  mongoose.connect('mongodb://localhost/wolftime');
}

var db = {};

console.log('Making wolf schema');
db.wolfSchema = new mongoose.Schema({
  baseSrc: String,
  clothing: {
    coats: {
      items: [{
      baseSrc: String, 
      coords: {
        x: Number, y: Number, z: Number
      },
      draggable: Boolean,
      name: String,
      topLeftCoords: {
        x: Number, y: Number
      },
      type: String}],

      max: Number,

      regions: [[Number]]
    },
    pants: {
      items: [{
      baseSrc: String, 
      coords: {
        x: Number, y: Number, z: Number
      },
      draggable: Boolean,
      name: String,
      topLeftCoords: {
        x: Number, y: Number
      },
      type: String}],

      max: Number,

      regions: [[Number]]
    },
    tails: {
      items: [{
      baseSrc: String, 
      coords: {
        x: Number, y: Number, z: Number
      },
      draggable: Boolean,
      name: String,
      topLeftCoords: {
        x: Number, y: Number
      },
      type: String}],

      max: Number,

      regions: [[Number]]
    }
  },
  imgUrl: String,
  name:  String,
  password: String
});

db.wolfSchema2 = new mongoose.Schema({
  baseSrc: String,
  clothing: {
    coats: [String],
    tails: [String],
    pants: [String]
  },
  imageURL: String,
  name: String,
  password: String
});

db.wolfSchema.plugin(findOrCreate);
db.wolfSchema2.plugin(findOrCreate);

db.mongoose = mongoose;

module.exports = db;