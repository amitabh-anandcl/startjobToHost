// const express = require("express");

// const app = express();
// const path = require("path");

// const cors = require("cors");

// app.use(cors());

// app.use("/", express.static("view"));

// app.get("*", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "view", "index.html"));
// });

// app.listen(4000, (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("angular app is running on port 4000");
// });

// const AWS = require("aws-sdk");

// AWS.config.update({
//   accessKeyId: "AKIAJEBQCG4TOLHRZA6Q",
//   secretAccessKey: "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",
//   region: "us-east-2",
// });

// const SES = new AWS.SES();

// var send = function (callback) {
//   var params = new Object();

//   var dest = {
//     ToAddresses: ["amitabh.anandcl@gmail.com"],
//   };

//   var template = new Object();

//   template.username = "Amitabh";

//   params.Source = "amitabhaxeanand@gmail.com";
//   params.Destination = dest;
//   params.Template = "startupjob";
//   params.TemplateData = JSON.stringify(template);

//   SES.sendTemplatedEmail(params, (err, data) => {
//     if (err) throw err;

//     callback(data);
//   });
// };

// send((data) => {
//   console.log(data);
// });
const accountSid = "ACdd1dce677deb1ab0fce3451769b85baa";
const authToken = "790e872e8b4dd31c3db9320bde2a04d6";
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "hello sandy gao mein nai aya",
    from: "+18507572975",
    to: "+917015594454",
  })
  .then((message) => console.log(message.sid));
