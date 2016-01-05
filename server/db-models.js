var db = require('./db-config');

var Wolf = db.mongoose.model("Wolf", db.wolfSchema);

exports.Wolf = Wolf;