import e, { Request, Response, Router } from "express";
import { EmployerDetailsService } from "../services/employerDetails.services";


export class EmployerDetailsController {
  
    public getEmployerDetailsByEmployerId(data: any) {
        try{
            return new EmployerDetailsService().getEmployerDetailsByEmployerId(data)
        }catch(error){
            throw error
        }
    }

    public getAllEmployerDetailsList() {
        try{
            return new EmployerDetailsService().getAllEmployerDetailsList()
        }catch(error){
            throw error
        }
    }

    public registerEmployer(data: any) {
        try{
            return new EmployerDetailsService().registerEmployer(data)
        }catch(error){
            throw error
        }
    }

    public employerLogin(data: any) {
        try{
            return new EmployerDetailsService().employerLogin(data)
        }catch(error){
            throw error
        }
    }
    
}