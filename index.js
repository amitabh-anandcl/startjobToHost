const express = require("express");

const app = express();
const path = require("path");

const cors = require("cors");

app.use(cors());

app.use("/", express.static("view"));

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.listen(4000, (err) => {
  if (err) {
    throw err;
  }
  console.log("angular app is running on port 4000");
});
