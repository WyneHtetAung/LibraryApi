const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BookSchema = new Schema({});

module.exports = mongoose.model("book", BookSchema);
