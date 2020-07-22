import { EmployerDetailsModel } from "../model/employerDetails.model";



export class EmployerDetailsService {
    public async getEmployerDetailsByEmployerId(data: any) {
        try {
            return await new EmployerDetailsModel().getEmployerDetailsByEmployerId(data);
           
        }
        catch (err) {
            throw err;
        }
    }

    public async getAllEmployerDetailsList() {
        try {
            return await new EmployerDetailsModel().getAllEmployerDetailsList();
           
        }
        catch (err) {
            throw err;
        }
    }

    
        public async registerEmployer(data: any) {
            try {
                return await new EmployerDetailsModel().registerEmployer(data);
               
            }
            catch (err) {
                throw err;
            }
        }

        public async employerLogin(data: any) {
            try {
                return await new EmployerDetailsModel().employerLogin(data);
               
            }
            catch (err) {
                throw err;
            }
        }
    
}
