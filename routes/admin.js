const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.check")
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
      error: error.toString(),
    })
    console.log(error)
  }
})

// duplicate email
router.post("/duplicateEmail", async (req, res) => {
  try {
    const duplicate = await Admin.findOne({ email: req.body.email })
    if (duplicate) {
      res.status(409).json({
        message: "email is exit",
      })
    } else {
      res.status(202).json({
        message: "email is not exit",
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

// duplicate name
router.post("/duplicateName", async (req, res) => {
  try {
    const duplicateName = await Admin.findOne({ name: req.body.name })
    if (duplicateName) {
      res.status(409).json({
        message: "name is exit",
      })
    } else {
      res.status(202).json({
        message: "name is not exit",
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
      error: error.toString(),
    })
    console.log(error)
  }
})

router.get("/admin-delete/:id", auth, async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id)
    if (admin) {
      res.status(200).json({
        message: "admin account is delete",
      })
    } else {
      res.status(404).json({
        message: "admin account is not found",
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

router.patch("/admin-update/:id", auth, async (req, res) => {
  try {
    const adminUpdate = await Admin.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    })
    const adminUpdated = await Admin.findById(req.params.id)
    if (adminUpdate) {
      res.status(200).json({
        message: "admin account data is updated",
        adminUpdated: adminUpdated,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "Inernal server error",
      error: error.toString(),
    })
    console.log(error)
  }
})

module.exports = router
