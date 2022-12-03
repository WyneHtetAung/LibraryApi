const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Book = require("../models/admin.book.model")
const jwt = require("jsonwebtoken")

require("dotenv").config()

router.get("/", (req, res) => {
  res.status(200).json({ message: "api is running..." })
})

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body)
    const userData = await user.save()
    res.status(201).json({ message: "acc created", acc: userData })
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      err: err.toString(),
    })
  }
})

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email })
    if (
      userData != null &&
      User.compare(req.body.password, userData.password)
    ) {
      const token = jwt.sign(
        { name: userData.name, id: userData._id },
        process.env.privatekey
      )
      res.status(200).json({
        message: "Login successful",
        token: token,
      })
    }
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      err: err.toString(),
    })
  }
})

router.post("/duemailcheck", async (req, res) => {
  try {
    const userData = await User.find({ email: req.body.email })
    res.status(200).json({
      status: userData.name != null ? true : false,
      message: userData,
    })
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      err: error.toString(),
    })
  }
})

router.get("/booklist", async(req, res) => {
  try {
  const bookData = await Book.find()
  res.status(200).json({
    message: "booklist",
    data: bookData,
  })
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      err: error.toString(),
    })
  }
})

router.get("/bookdetail/:id", async(req, res) => {
  try {
    const bookId = req.params.id
  const bookData = await Book.findById(bookId)
  res.status(200).json({
    message: "bookdetail",
    data: bookData,
  })
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      err: error.toString(),
    })
  }

})

module.exports = router
