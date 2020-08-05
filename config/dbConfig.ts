var mysql = require("mysql");
import * as dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  // throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const connection: any = mysql.createConnection({
  env: envFound.parsed?.NODE_ENV || process.env.NODE_ENV,
  //port: process.env.PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
  insecureAuth: true,
});
connection.connect((err: object) => {
  if (err) throw err;
  console.log("Connected!");
});

export default connection;
