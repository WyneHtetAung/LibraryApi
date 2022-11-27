const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = function (req, res, next) {
  try {
    var token = req.headers.token;
    var decode = jwt.verify(token, process.env.privatekey);
    console.log(decode);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Auth Fail",
    });
  }
};
