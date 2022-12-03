const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.check")
const User = require("../models/User")
const Book = require("../models/admin.book.model")
const multer = require("multer")

const bookCover = multer({ dest: "./public/images" })

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

router.get("/user-management", auth, async (req, res) => {
  try {
    var userDate = await User.find({})
    res.status(202).json({
      message: "User data for user management",
      userDate: userDate,
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.toString(),
    })
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

router.post(
  "/book-register",
  auth,
  bookCover.single("bookCover"),
  async (req, res) => {
    try {
      let book = new Book(req.body)
      book.coverImage = `/images/${req.file.filename}`

      await book.save()
      await res.status(201).json({
        message: "Book registation complete",
      })
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.toString(),
      })
      console.log(error)
    }
  }
)

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
  }
})

router.get("/borrowbook-panel", auth, async (req, res) => {
  try {
    const books = await Book.find().select("bookName coverImage requests isAvailable")
    res.status(200).json({
      message: "books and requests",
      data: books,
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.toString(),
    })
  }
})

router.get("/accept-borrowbook/:userId/:bookId", auth, async (req, res) => {
  try {
    const userId = req.params.userId
    const bookId = req.params.bookId
    const bookData = await Book.findByIdAndUpdate(bookId, {
      $set: {
        isAvailable: false,
        currentBorrower: userId,
        borrowDate: Date.now(),
        requests: [],
      },
    })
    res.status(200).json({
      message: "book-request accepted",
      data: bookData,
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.toString(),
    })
  }
})

module.exports = router
