const express = require("express")
const router = express.Router()
const Admin = require("../models/Admin")
const jwt = require("jsonwebtoken")
require("dotenv").config()
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Library management system",
  })
})

// admin account register
router.post("/register", async (req, res) => {
  try {
    let admin = new Admin(req.body)
    await admin.save()
    res.status(201).json({
      message: "User account create",
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    })
  }
})

// duplicate email
router.post("/duplicateEmail", async (req, res) => {
  try {
    await Admin.findOne({ email: req.body.email })
    res.status(200).json({
      status: rtn != null ? true : false,
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    })
  }
})

// admin login
router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email })
    console.log(admin)
    if (
      admin &&
      admin != null &&
      Admin.compare(req.body.password, admin.password)
    ) {
      var token = jwt.sign(
        {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
        process.env.privatekey,
        { expiresIn: "1h" }
      )
      res.status(200).json({
        message: "Account login success",
        token: token,
      })
    } else {
      res.status(401).json({
        message: "Email Or Password is not match",
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    })
  }
})

module.exports = router
