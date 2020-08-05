import { Request, Response, NextFunction, Router } from "express";
import { EmployerDetailsController } from "../controller/employerDetails.controller";
import { EmployerDetailsValidator } from "../validator/employerDetailsValidator";
import * as path from "path";
import * as fs from "fs-extra";
import * as app_root_path from "app-root-path";
import * as multer from "multer";
const route = Router();
let inputValidator = new EmployerDetailsValidator();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { EMPLOYERMAILID } = req.body;
    const uploadPath = path.join(app_root_path.path, "assets", EMPLOYERMAILID);
    //console.log(uploadPath);
    if (fs.existsSync(uploadPath)) {
      cb(null, uploadPath);
    } else {
      fs.mkdirSync(uploadPath);
      cb(null, uploadPath);
    }
  },
  filename: function (req: any, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

export default (app: any) => {
  app.use(route);
  let employerDetailsController = new EmployerDetailsController();

  route.post(
    "/getEmployerDetailsByEmployerId",

    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let data = req.body;
        let response: any = await employerDetailsController.getEmployerDetailsByEmployerId(
          data
        );
        if (Array.isArray(response)) {
          res.status(200).send({
            status: true,
            data: {
              getEmployerDetailsByEmployerId: response[0],
            },
            message: "Employer Details Record fetched successfully.",
          });
        } else {
          res.status(404).send({
            status: false,
            data: {
              getEmployerDetailsByEmployerId: response,
            },
            message: "Something went worng!.",
          });
        }
      } catch (e) {
        next(e);
      }
    }
  );

  route.get(
    "/getAllEmployerDetailsList",

    async (req: Request, res: Response, next: NextFunction) => {
      try {
        //let data = req.body;
        let response: any = await employerDetailsController.getAllEmployerDetailsList();
        if (Array.isArray(response)) {
          res.status(200).send({
            status: true,
            data: {
              getAllEmployerDetailsList: response[0],
            },
            message: "All Employer Details List fetched successfully.",
          });
        } else {
          res.status(404).send({
            status: false,
            data: {
              getAllEmployerDetailsList: response,
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
    "/registerEmployer",
    upload.single("companyLogo"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let data = req.body;

        if (req.file) {
          data.EMPLOYERLOGOFILE = data.EMPLOYERMAILID + "/" + req.file.filename;
        }
        let response: any = await employerDetailsController.registerEmployer(
          data
        );
        if (Array.isArray(response)) {
          if (response[1][0]["@s"] == "User already exists") {
            if (req.file) {
              fs.unlinkSync(
                path.join(app_root_path.path, "assets", data.EMPLOYERLOGOFILE)
              );
            }
            res.status(200).send({
              status: true,
              // data: {
              //     registerUser: response[1][0]
              // },
              message: "EmployerUser already exists",
            });
          } else if (response[1][0]["@s"] == "User Registered") {
            res.status(200).send({
              status: true,
              // data: {
              //     registerUser: response[1][0]
              // },
              message: "EmployerUser Registration successfully",
            });
          }
        } else {
          res.status(404).send({
            status: false,
            data: {
              registerEmployer: response,
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
    "/employerLogin",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let data = req.body;
        let response: any = await employerDetailsController.employerLogin(data);
        if (Array.isArray(response)) {
          if (response[2][0]["@o_status"] == 106) {
            res.status(200).send({
              status: true,
              data: {
                employerLogin: response[0],
              },
              message: "Employer Login successfully.",
            });
          } else if (response[2][0]["@o_status"] == 105) {
            res.status(200).send({
              status: false,
              // data: {
              //     employerLogin: response
              // },
              message: "Employer Login Unsuccessfull.",
            });
          }
        } else {
          res.status(404).send({
            status: false,
            data: {
              employerLogin: response,
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
