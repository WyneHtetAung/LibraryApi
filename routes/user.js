const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Book = require("../models/admin.book.model")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth.check")
const { findByIdAndUpdate } = require("../models/admin.book.model")
const { findById } = require("../models/User")

const { privatekey } = process.env

router.get("/", auth, (req, res) => {
  try {
    // const decode = jwt.verify(req.headers.token, privatekey);
    res.status(200).json({
      message: "user route is running",
    })
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      err: err.toString(),
    })
  }
})

router.get("/booklist", auth, async (req, res) => {
  try {
    const bookData = await Book.find()
    res.status(200).json({
      message: "booklist",
      data: bookData,
    })
  } catch (error) {
    res.status.json({
      message: "something went wrong",
      err: error.toString(),
    })
  }
})

router.get("/bookdetail/:id", auth, async (req, res) => {
  try {
    const decode = jwt.verify(req.headers.token, privatekey)
    const bookData = await Book.findOne({ _id: req.params.id })
    console.log(bookData)
    res.status(200).json({
      message: "booklist",
      data: bookData,
      userId: decode.id,
    })
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      err: error.toString(),
    })
  }
})

router.get("/borrowbook/:userId/:bookId", auth, async (req, res) => {
  try {
    const userId = req.params.userId
    const bookId = req.params.bookId
    const data = await Book.findById(bookId)

    let status = null
    const idAry = data.requests
    const length = data.requests.length
    for (let i = 0; i < length; i++) {
      status = userId == (await idAry[i]) ? false : true
    }
    if (status ?? true) {
      data.requests.push(userId)
      await data.save()
    }

    res.status(200).json({
      message: "book request",
      isDuplicate:
        status ?? true == true
          ? "This user requests for the first time"
          : "This user has already requested",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "something went wrong",
      err: error.toString(),
    })
  }
})

module.exports = router
