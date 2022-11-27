var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth.check");
var User = require("../models/user");

// connect to admin dashboard
router.get("/admin_dashboard", auth, function (req, res) {
  res.status(200).json({
    message: "Admin dashboard connect",
  });
});

// user register
router.post("/user_register", auth, function (req, res) {
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.membership = req.body.membership;
  user.expireDate = req.body.expireDate;
  user.save(function (err, rtn) {
    if (err) {
      res.status(500).json({
        message: "Internal server error",
        error: err,
      });
    } else {
      res.status(201).json({
        message: "User account create",
      });
    }
  });
});

module.exports = router;
