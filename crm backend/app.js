require("dotenv").config();

let exp = require("express");
let express = require("./configs/express");
const mongoose = require("mongoose");

let config = require("./configs/configs");

mongoose.connect(config.mongodb.url, config.mongodb.mongoOptions).then(
  async () => {
    var collections = mongoose.connections[0].collections;
    names = [];
    Object.keys(collections).forEach(function (k) {
      names.push(k);
    });
    global.collections = names;
    console.log("Mongo Connected at ", config.mongodb.url);
  },
  async (err) => {
    console.log(err);
  }
);

const app = express();
const server = require("http").Server(app);


app.get("/", function (req, res, next) {
  res.send("welcome to election portal");
});

server.listen(config.serverPort, () => {
  console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  console.log(`Server running at http://localhost:${config.serverPort}`);
});
