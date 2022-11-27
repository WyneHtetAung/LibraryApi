const express = require("express")
const router = express.Router()
const User = require("../models/User")
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
      err: err,
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
      err: err,
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
      err: error,
    })
  }
})

module.exports = router
