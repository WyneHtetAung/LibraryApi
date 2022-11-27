const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.check");

const { privatekey } = process.env;

router.get("/", auth, (req, res) => {
  try {
    // const decode = jwt.verify(req.headers.token, privatekey);
    res.status(200).json({
      message: "user route is running",
    });
  } catch (err) {
    res.status(200).json({
        message: "user route is running",
        err: err
      });
  }
});

module.exports = router;
