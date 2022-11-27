const http = require("http");
const app = require("./app");
const env = require("dotenv");
env.config();

const PORT = process.env.PORT;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
