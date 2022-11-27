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
  let admin = new Admin(req.body)
  await admin.save((err, rtn) => {
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

// duplicate email
router.post("/duplicateEmail", async (req, res) => {
  await Admin.findOne({ email: req.body.email }, (err, rtn) => {
    if (err) {
      res.status(500).json({
        message: "Internal server error",
        error: err,
      })
    } else {
      res.status(200).json({
        status: rtn != null ? true : false,
      })
    }
  })
})

// admin login
router.post("/login", async (req, res) => {
  Admin.findOne({ email: req.body.email }, (err, rtn) => {
    if (err) {
      res.status(500).json({
        message: "Internal server error",
        error: err,
      })
    }
    if (rtn != null && Admin.compare(req.body.password, rtn.password)) {
      let token = jwt.sign(
        {
          id: rtn._id,
          name: rtn.name,
          email: rtn.email,
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
  })
})

module.exports = router
