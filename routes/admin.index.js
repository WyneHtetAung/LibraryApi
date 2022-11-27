const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.check")
const User = require("../models/User")
const Book = require("../models/Admin.book")

// connect to admin dashboard
router.get("/admin_dashboard", auth, async (req, res) => {
  try {
    var book = await Book.find({})
    var user = await User.find({})
    res.status(202).json({
      message: "book data and user data",
    })
  } catch (error) {
    res.status(500).json({
      messsage: "Internal server error",
      error: error,
    })
  }
  console.log("book data:", book)
  console.log("user data:", user)
})

// user register
router.post("/user-register", auth, async (req, res) => {
  try {
    let user = new User(req.body)
    await user.save()
    res.status(201).json({
      message: "User account create",
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    })
  }
})

router.post("/book-register", auth, async (req, res) => {
  try {
    let book = new Book(req.body)
    await book.save()
    res.status(201).json({
      message: "Book registation complete",
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    })
  }
})

module.exports = router
