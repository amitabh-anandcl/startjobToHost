var express = require("express");
var app = express();
import routes from "./routes/index";
var bodyParser = require("body-parser");
import * as fs from "fs";
import * as cors from "cors";
import * as morgan from "morgan";

import * as path from "path";
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
var mysql = require("mysql");
var dbConfig = require("./config/dbConfig");

let accessLogStream = fs.createWriteStream(
  path.join(__dirname, "accessApi.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/uploadFile", express.static("assets"));

//app.use(bodyParser.urlencoded({extended: false}));

app.use("/api", routes);

app.use((err: any, req: any, res: any, next: any) => {
  let statusCode = err.status || 500;
  switch (err.name) {
    case "accessDenied":
      statusCode = 401;
      break;
  }
  //Send the response to client.
  res.status(statusCode).send({
    success: false,
    error: {
      message: err.message,
    },
  });
});

app.listen(3000, function () {
  console.log("Node app is running on port 3000");
});

module.exports = app;
