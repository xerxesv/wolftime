var db = require('./db-config');

var Wolf = db.mongoose.model("Wolf", db.wolfSchema);

var Wolf2 = db.mongoose.model("Wolf2", db.wolfSchema2);

exports.Wolf = Wolf;
exports.Wolf2 = Wolf2;