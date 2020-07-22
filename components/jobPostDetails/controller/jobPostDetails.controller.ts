import e, { Request, Response, Router } from "express";
import { JobPostDetailsService } from "../services/jobPostDetails.services";
 

export class JobPostDetailsController {
    

  public addUpdateJobPostDetails(data: any) {
    try{
        return new JobPostDetailsService().addUpdateJobPostDetails(data)
    }catch(error){
        throw error
    }
}

    public getJobPostDetails(data: any) {
        try{
            return new JobPostDetailsService().getJobPostDetails(data)
        }catch(error){
            throw error
        }
    }

    public getAllJobPostDetailsList() {
        try{
            return new JobPostDetailsService().getAllJobPostDetailsList()
        }catch(error){
            throw error
        }
    }

    public getJobTypesDetailsList() {
        try{
            return new JobPostDetailsService().getJobTypesDetailsList()
        }catch(error){
            throw error
        }
    }
    
}