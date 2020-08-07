import { Request, Response, NextFunction, Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { AuthValidator } from "../validator/authValidator";

const route = Router();
let inputValidator = new AuthValidator();

export default (app: any) => {
  app.use(route);
  let authenticationController = new AuthController();

  route.post(
    "/getUserLogin",
    inputValidator.login,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let data = req.body;
        let response: any = await authenticationController.getUserLogin(data);
        if (Array.isArray(response)) {
          if (response[2][0]["@o_status"] == 106) {
            res.status(200).send({
              status: true,
              data: {
                getUserLogin: response[0],
              },
              message: "Login successfully.",
            });
          } else if (response[2][0]["@o_status"] == 105) {
            res.status(200).send({
              status: false,
              // data: {
              //     getUserLogin: response
              // },
              message: "Login Unsuccessfull.",
            });
          }
        } else {
          res.status(404).send({
            status: false,
            data: {
              getUserLogin: response,
            },
            message: "Something went worng!.",
          });
        }
      } catch (e) {
        next(e);
      }
    }
  );

  route.post(
    "/registerUser",
    inputValidator.registerUser,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let data = req.body;
        let response: any = await authenticationController.registerUser(data);
        if (Array.isArray(response)) {
          //console.log(response)
          if (response[1][0]["@s"] == "User already exists") {
            res.status(200).send({
              status: true,
              // data: {
              //     registerUser: response[1][0]
              // },
              message: "User already exists",
            });
          } else if (response[1][0]["@s"] == "User Registered") {
            res.status(200).send({
              status: true,
              // data: {
              //     registerUser: response[1][0]
              // },
              message: "User Registration successfull",
            });
          }
        } else {
          res.status(404).send({
            status: false,
            data: {
              registerUser: response,
            },
            message: "Something went worng!.",
          });
        }
      } catch (e) {
        next(e);
      }
    }
  );
};
