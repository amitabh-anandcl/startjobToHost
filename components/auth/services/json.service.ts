import * as jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { token } from "morgan";
const redis = require("redis");
const client = redis.createClient();
/****************************************************************
 * this class is only for development and demo purposes no for prodcuction.
 */
let record: any = [];

export class JsonWebTokens {
  constructor() {}

  verfyToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, "hello", (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
  signToken(username: string) {
    return jwt.sign({ username: username }, "hello", { expiresIn: "1h" });
  }

  getAllRecord() {
    return record;
  }
  getUserExits(username: string) {
    return record[username];
  }
  pushUser(username: string, obj: any) {
    record[username] = obj;
  }
  popUser(username: string) {
    delete record[username];
  }
  checkANdVerify(req: any, res: any, next: NextFunction) {
    const auth = req.headers["authorization"];

    // console.log("hello", tokenFromRedis);
    client.get(auth, function (err: any, reply: any) {
      // reply is null when the key is missing

      if (reply) {
        console.log("yes found");
        jwt.verify(auth, "hello", (err: any, result: any) => {
          if (err) {
            throw err;
          } else {
            console.log("yes");
            next();
          }
        });
      } else {
        res.status(200).send({
          status: false,
          tokenExp: true,
        });
      }
    });
  }
  removeToken(req: any, res: any, next: NextFunction) {}
  accessGrantToUser(data: any) {
    const token_ = jwt.sign({ username: data.EMPLOYERMAILID }, "hello", {
      expiresIn: "1h",
    });
    client.set(token_, token_, redis.print);
    return token_;
  }
}
