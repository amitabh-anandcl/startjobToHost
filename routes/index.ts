import { Router } from "express";

import authRoute from "../components/auth/routes/auth.routes";
import candidateDetailsRoute from "../components/candidateDetails/routes/candidateDetails.routes";
import employerDetailsRoute from "../components/employerDetails/routes/employerDetails.routes";
import jobPostDetailsRoute from "../components/jobPostDetails/routes/jobPostDetails.routes";


const route = Router();

authRoute(route);
candidateDetailsRoute(route);
employerDetailsRoute(route);
jobPostDetailsRoute(route);


export default route;
