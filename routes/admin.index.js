const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.check")
const User = require("../models/User")
const Book = require("../models/Admin.book")

// connect to admin dashboard
router.get("/admin_dashboard", auth, async (req, res) => {
  Book.find({}, (err, rtn) => {
    if (err) {
      res.status(500).json({
        messsage: "Internal server error",
        error: err,
      })
    }
    User.find({}, (err2, rtn2) => {
      if (err2) {
        res.status(500).json({
          messsage: "Internal server error",
          error: err2,
        })
      } else {
        res.status(202).json({
          message: "book data and user data",
        })
        console.log("book data:", rtn)
        console.log("user data:", rtn2)
      }
    })
  })
})

// user register
router.post("/user-register", auth, async (req, res) => {
  let user = new User(req.body)
  await user.save((err, rtn) => {
    if (err) {
      res.status(500).json({
        message: "Internal server error",
        error: err,
      })
    } else {
      res.status(201).json({
        message: "User account create",
      })
    }
  })
})

router.post("/book-register", auth, async (req, res) => {
  let book = new Book(req.body)
  await book.save((err, rtn) => {
    if (err) {
      res.status(500).json({
        message: "Internal server error",
        error: err,
      })
    } else {
      res.status(201).json({
        message: "Book registation complete",
      })
    }
  })
})

module.exports = router
