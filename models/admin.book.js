const mongoose = require("mongoose")
let Schema = mongoose.Schema
// let Schema = mongoose.Schema

let BookSchema = new Schema({
  authorName: {
    type: String,
    require: true,
  },
  bookName: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  bookReview: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  corverImage: {
    type: String,
    require: true,
  },
  bookId: {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model("book", BookSchema)
