import { CandidateDetailsModel } from "../model/candidateDetails.model";
import { param } from "express-validator";

export class CandidateDetailsService {
  public async addUpdateCandidateDetails(data: any) {
    try {
      let params: any = await new CandidateDetailsModel().addUpdateCandidateDetails(
        data
      );
      //console.log(data);

      if (data != undefined) {
        if (data.EMPLOYERMAILID) {
          await new CandidateDetailsModel().sendCredentialsForCvUpload(data);
        }
      }
      return params;
    } catch (err) {
      throw err;
    }
  }

  public async getCandidateDetailsByCandidateId(data: any) {
    try {
      return await new CandidateDetailsModel().getCandidateDetailsByCandidateId(
        data
      );
    } catch (err) {
      throw err;
    }
  }

  public async getAllCandidateDetailsList() {
    try {
      return await new CandidateDetailsModel().getAllCandidateDetailsList();
    } catch (err) {
      throw err;
    }
  }
}
