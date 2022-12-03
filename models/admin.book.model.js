const mongoose = require("mongoose")
let Schema = mongoose.Schema

let BookSchema = new Schema({
  authorName: {
    type: String,
    require: true,
  },
  bookName: {
    type: String,
    require: true,
  },
  ReleasedDate: {
    type: String,
    require: true,
  },
  bookReview: {
    type: Number
  },
  category: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true
  },
  requests: [

  ],
  isAvailable: {
    type: Boolean,
    dafault: true
  },
  currentBorrower: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  borrowDate: {
    type: Date
  },
  coverImage: {
    type: String,
  },
  bookId: {
    type: String,
  },
})

module.exports = mongoose.model("book", BookSchema)
