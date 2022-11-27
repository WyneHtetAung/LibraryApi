const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.check")
const User = require("../models/User")
const Book = require("../models/Admin.book")

// connect to admin dashboard
router.get("/admin_dashboard", auth, (req, res) => {
  res.status(200).json({
    message: "Admin dashboard connect",
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
