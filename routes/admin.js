var express = require("express")
var router = express.Router()
var Admin = require("../models/admin")
var jwt = require("jsonwebtoken")
require("dotenv").config()
router.get("/", function (req, res) {
  res.status(200).json({
    message: "Library management system",
  })
})

// admin account register
router.post("/register", function (req, res) {
  var admin = new Admin()
  admin.name = req.body.name
  admin.email = req.body.email
  admin.password = req.body.password
  admin.role = req.body.role
  admin.save(function (err, rtn) {
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
router.post("/duplicateEmail", function (req, res) {
  Admin.findOne({ email: req.body.email }, function (err, rtn) {
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
router.post("/login", function (req, res) {
  Admin.findOne({ email: req.body.email }, function (err, rtn) {
    if (err) {
      res.status(500).json({
        message: "Internal server error",
        error: err,
      })
    }
    if (rtn != null && Admin.compare(req.body.password, rtn.password)) {
      var token = jwt.sign(
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
