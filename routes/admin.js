var express = require("express");
var router = express.Router();
var Admin = require("../models/admin");

router.get("/", function (req, res) {
  res.status(200).json({
    message: "Library management system",
  });
});
// router.post("/", function (req, res) {
//   console.log(req.body);
// });

router.post("/register", function (req, res) {
  var admin = new Admin();
  admin.name = req.body.name;
  admin.email = req.body.email;
  admin.password = req.body.password;
  admin.save(function (err, rtn) {
    if (err) {
      res.status(500).json({
        message: "Internal server error",
        error: err,
      });
    } else {
      res.status(201).json({
        message: "User account created",
      });
    }
  });
});

module.exports = router;
