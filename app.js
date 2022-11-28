const express = require("express")
const mongoose = require("mongoose")
const app = express()
const bodyParser = require("body-parser")
const admin_route = require("./routes/admin")
const admin_index_route = require("./routes/admin.user")
const index_route = require("./routes/index")
const user_route = require("./routes/user")

require("dotenv").config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(process.env.MongoString)
var db = mongoose.connection
db.on(
  "error",
  console.error.bind("MongoDB connection error at library management system")
)
db.on("connected", () => console.log("Database connected!"))

app.use("/api/admin", admin_route)
app.use("/api/admin/users", admin_index_route)
app.use("/api/index", index_route)
app.use("/api/user", user_route)

app.use((req, res, next) => {
  res.status(200).json({
    message: "app is running....",
  })
})

module.exports = app
