const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const fs = require("fs");

const http = require("http");
const https = require("https");
const privateKey = fs.readFileSync("cert/privateKey.key", "utf8");
const certificate = fs.readFileSync("cert/certificate.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };

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

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
  console.log("started port 80");
});
httpsServer.listen(443, () => {
  console.log("started on 443 port http port");
});
