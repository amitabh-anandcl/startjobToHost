const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const fs = require("fs");

let accessLogStream = fs.createWriteStream(
  path.join(__dirname, "accessWeb.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));
const cors = require("cors");

app.use(cors());

app.use("/", express.static("view"));

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.listen(80, (err) => {
  if (err) {
    throw err;
  }
  console.log("angular app is running on port 4000");
});
