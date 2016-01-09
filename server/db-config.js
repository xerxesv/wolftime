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
    coats: [ {name: String, baseSrc: String, draggable:Boolean} ],
    tails: [ {name: String, baseSrc: String, draggable:Boolean} ],
    pants: [ {name: String, baseSrc: String, draggable:Boolean} ]
  },
  imageURL: String,
  name: String,
  password: String
});

db.wolfSchema2.methods.comparePassword = function (attemptedPassword, callback) {
  // TO DO: encrypt password
  if (attemptedPassword === this.password) {
    callback(true);
  } else {
    callback(false);
  }
};


db.mongoose = mongoose;

module.exports = db;