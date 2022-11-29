const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.check")
const User = require("../models/User")
const Book = require("../models/Admin.book")

// connect to admin dashboard
router.get("/admin-dashboard", auth, async (req, res) => {
  try {
    var book = await Book.find({})
    var user = await User.find({})
    res.status(202).json({
      message: "book data and user data",
      book: book,
      user: user,
    })
  } catch (error) {
    res.status(500).json({
      messsage: "Internal server error",
      error: error.toString(),
    })
    console.log(error)
  }
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
      error: error.toString(),
    })
    console.log(error)
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
      error: error.toString(),
    })
    console.log(error)
  }
})

router.get("/user-delete/:id", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (user) {
      res.status(200).json({
        message: "User account is delete",
      })
    } else {
      res.status(404).json({
        message: "User account is not found",
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.toString(),
    })
    console.log(error)
  }
})

router.patch("/user-update/:id", auth, async (req, res) => {
  try {
    const userUpdate = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    })
    const userUpdated = await User.findById(req.params.id)
    if (userUpdate) {
      res.status(200).json({
        message: "user data is updated",
        updateData: userUpdated,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.toString(),
    })
    console.log(error)
  }
})

module.exports = router
