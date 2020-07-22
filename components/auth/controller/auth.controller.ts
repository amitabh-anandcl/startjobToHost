import e, { Request, Response, Router } from "express";
import { AuthService } from "../services/auth.services";


export class AuthController {
  
    public async getUserLogin(data: any) {
        try{
            return await new AuthService().getUserLogin(data)
        }catch(error){
            throw error
        }
    }

    public async registerUser(data: any) {
        try{
            return await new AuthService().registerUser(data)
        }catch(error){
            throw error
        }
    }
    




}