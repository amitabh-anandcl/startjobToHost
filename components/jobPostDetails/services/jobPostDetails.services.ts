import { JobPostDetailsModel } from "../model/jobPostDetails.model";



export class JobPostDetailsService {
    
    public  addUpdateJobPostDetails(data: any) {
        try {
            return new JobPostDetailsModel().addUpdateJobPostDetails(data);
    
        }catch (err) {
            throw err;
        }
    }
    public  getJobPostDetails(data: any) {
        try {
            return new JobPostDetailsModel().getJobPostDetails(data);
    
        }catch (err) {
            throw err;
        }
    }

    public  getAllJobPostDetailsList() {
        try {
            return new JobPostDetailsModel().getAllJobPostDetailsList();
    
        }catch (err) {
            throw err;
        }
    }

    public  getJobTypesDetailsList() {
        try {
            return new JobPostDetailsModel().getJobTypesDetailsList();
    
        }catch (err) {
            throw err;
        }
    }

}
