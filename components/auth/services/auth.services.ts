import { authModel } from "../model/auth.model";
import * as jwt from "jsonwebtoken";
export class AuthService {
  public async getUserLogin(data: any) {
    try {
      return await new authModel().getUserLogin(data);
    } catch (err) {
      throw err;
    }
  }

  public async registerUser(data: any) {
    try {
      return await new authModel().registerUser(data);
    } catch (err) {
      throw err;
    }
  }
}
