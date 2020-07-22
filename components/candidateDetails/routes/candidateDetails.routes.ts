import { Request, Response, NextFunction, Router } from "express";
import { CandidateDetailsController } from "../controller/candidateDetailsController";
import { CandidateDetailsValidator } from "../validator/candidateDetailsValidator";
import multer from "multer";
import app_root_path from "app-root-path";
import fs from "fs";
import path from "path";
const route = Router();
//app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//  var bodyParser = require('body-parser');
//  var urlencodedParser = bodyParser.urlencoded({ limit: "50mb",extended: true })
let inputValidator = new CandidateDetailsValidator();
/** multer confoguration */
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    if (
      !fs.existsSync(path.join(app_root_path.path, "assets", "candidateCV"))
    ) {
      fs.mkdirSync(path.join(app_root_path.path, "assets", "candidateCV"));
    }

    cb(null, path.join(app_root_path.path, "assets", "candidateCV"));
  },
  filename: function (req: any, file: any, cb: any) {
    cb(
      null,
      file.originalname.substr(0, file.originalname.lastIndexOf(".")) +
        "-" +
        Date.now() +
        file.originalname.substr(file.originalname.lastIndexOf("."))
    );
  },
});

const upload = multer({ storage: storage });

export default (app: any) => {
  app.use(route);
  let candidateDetailsController = new CandidateDetailsController();

  route.post(
    "/addUpdateCandidateDetails",
    // inputValidator.addUpdateCandidateDetails,
    upload.single("CANDIDATECVFILE"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let data = req.body;
        if (req.file !== undefined) {
          data.CANDIDATECVFILE = req.file.filename;
        }
        let response: any = await candidateDetailsController.addUpdateCandidateDetails(
          data
        );

        if (Array.isArray(response)) {
          //console.log(response)
          if (response[1][0]["@o_status"] == -1) {
            res.status(200).send({
              status: true,
              data: {
                addUpdateCandidateDetails: response[1],
              },
              type: -1,
              message: "Candidate has ALready Sent.",
            });
          } else if (response[1][0]["@o_status"] >= 0) {
            res.status(200).send({
              status: true,
              data: {
                addUpdateCandidateDetails: response[1],
              },
              type: 1,
              message: "Candidate has successfully sent info. Check Mail",
            });
          } else if (response[1][0]["@o_status"] == 404) {
            res.status(200).send({
              status: false,
              data: {
                addUpdateCandidateDetails: response[1],
              },
              message: "SQL EXCEPTION!.",
            });
          }
        } else {
          res.status(404).send({
            status: false,
            data: {
              addUpdateCandidateDetails: response,
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
    "/getCandidateDetailsByCandidateId",

    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let data = req.body;
        let response: any = await candidateDetailsController.getCandidateDetailsByCandidateId(
          data
        );
        if (Array.isArray(response)) {
          res.status(200).send({
            status: true,
            data: {
              getCandidateDetailsByCandidateId: response[0],
            },
            message: "Candidate Details Record fetched successfully.",
          });
        } else {
          res.status(404).send({
            status: false,
            data: {
              getCandidateDetailsByCandidateId: response,
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
    "/getAllCandidateDetailsList",

    async (req: Request, res: Response, next: NextFunction) => {
      try {
        //let data = req.body;
        let response: any = await candidateDetailsController.getAllCandidateDetailsList();
        if (Array.isArray(response)) {
          res.status(200).send({
            status: true,
            data: {
              getAllCandidateDetailsList: response[0],
            },
            message: "All Candidate Details List fetched successfully.",
          });
        } else {
          res.status(404).send({
            status: false,
            data: {
              getAllCandidateDetailsList: response,
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
