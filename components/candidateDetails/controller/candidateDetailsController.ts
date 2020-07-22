import e, { Request, Response, Router } from "express";
import { CandidateDetailsService } from "../services/candidateDetails.services";


export class CandidateDetailsController {
  
    public addUpdateCandidateDetails(data: any) {
        try{
            return new CandidateDetailsService().addUpdateCandidateDetails(data)
        }catch(error){
            throw error
        }
    }

    public getCandidateDetailsByCandidateId(data: any) {
        try{
            return new CandidateDetailsService().getCandidateDetailsByCandidateId(data)
        }catch(error){
            throw error
        }
    }

    public getAllCandidateDetailsList() {
        try{
            return new CandidateDetailsService().getAllCandidateDetailsList()
        }catch(error){
            throw error
        }
    }

}