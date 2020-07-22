import { Request, Response, NextFunction, Router } from "express";
import { JobPostDetailsController } from "../controller/jobPostDetails.controller";
import { JobPostDetailsValidator } from "../validator/jobPostDetailsValidator";

const route = Router();
let inputValidator = new JobPostDetailsValidator();

export default (app: any) => {
  app.use(route);
  let jobPostDetailsController = new JobPostDetailsController();

  route.post(
    "/addUpdateJobPostDetails",

    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let data = req.body;
        let response: any = await jobPostDetailsController.addUpdateJobPostDetails(
          data
        );
        if (Array.isArray(response)) {
          if (response[1][0]["@o_status"] == 106) {
            res.status(200).send({
              status: true,
              data: {
                addUpdateJobPostDetails: response[1],
              },
              message: "Job Post Details Save successfully.",
            });
          } else if (response[1][0]["@o_status"] == 105) {
            res.status(200).send({
              status: true,
              data: {
                addUpdateJobPostDetails: response[1],
              },
              message: "Job Post Details Update successfully.",
            });
          } else if (response[1][0]["@o_status"] == 404) {
            res.status(200).send({
              status: false,
              data: {
                addUpdateJobPostDetails: response[1],
              },
              message: "SQL EXCEPTION!.",
            });
          }
        } else {
          res.status(404).send({
            status: false,
            data: {
              addUpdateJobPostDetails: response,
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
    "/getJobPostDetails",

    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let data = req.body;
        let response: any = await jobPostDetailsController.getJobPostDetails(
          data
        );
        if (Array.isArray(response)) {
          res.status(200).send({
            status: true,
            data: {
              getJobPostDetails: response[0],
            },
            message: "Job Post Details fetched successfully.",
          });
        } else {
          res.status(404).send({
            status: false,
            data: {
              getJobPostDetails: response,
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
    "/getAllJobPostDetailsList",

    async (req: Request, res: Response, next: NextFunction) => {
      try {
        //let data = req.body;
        let response: any = await jobPostDetailsController.getAllJobPostDetailsList();
        if (Array.isArray(response)) {
          res.status(200).send({
            status: true,
            data: {
              getAllJobPostDetailsList: response[0],
            },
            message: "All Job Post Details List fetched successfully.",
          });
        } else {
          res.status(404).send({
            status: false,
            data: {
              getAllJobPostDetailsList: response,
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
    "/getJobTypesDetailsList",

    async (req: Request, res: Response, next: NextFunction) => {
      try {
        //let data = req.body;
        let response: any = await jobPostDetailsController.getJobTypesDetailsList();
        if (Array.isArray(response)) {
          res.status(200).send({
            status: true,
            data: {
              getJobTypesDetailsList: response[0],
            },
            message: "Job Types List fetched successfully.",
          });
        } else {
          res.status(404).send({
            status: false,
            data: {
              getJobTypesDetailsList: response,
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
